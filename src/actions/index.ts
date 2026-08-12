import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import React from 'react';
import { randomUUID } from 'node:crypto';
import ContactNotification from '../emails/ContactNotification';
import ContactAutoReply from '../emails/ContactAutoReply';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
    contact: defineAction({
        accept: 'form',
        input: z.object({
            name:    z.string().min(2,  'Please enter your full name.'),
            email:   z.email('Please enter a valid email address.'),
            phone:   z.string()
                       .trim()
                       .transform((val) => val.replace(/[\s-]/g, ''))
                       .pipe(
                           z.string().regex(
                               /^(?:\+27|0)\d{9}$/,
                               'Please enter a valid South African phone number, e.g. 082 123 4567 or +27 82 123 4567.'
                           )
                       ),
            service: z.string().min(1, 'Please select a service.'),
            subject: z.string().optional(),
            message: z.string().min(20, 'Please enter at least 20 characters.'),
            // Honeypot - real users never see or fill this field. Any value means a bot.
            website: z.string().optional(),
        }),
        handler: async ({ name, email, phone, service, subject, message, website }) => {
            // Silently pretend success for bots so they don't learn to avoid the field.
            if (website) {
                return { success: true };
            }

            const fromEmail  = import.meta.env.FROM_EMAIL  ?? 'noreply@info.phehlwanagroup.co.za';
            const toEmail    = import.meta.env.TO_EMAIL    ?? 'info@phehlwanagroup.co.za';
            const subjectLine = subject?.trim() || `New enquiry - ${service}`;

            // Render React components to HTML strings
            const notificationHtml = await render(
                React.createElement(ContactNotification, {
                    name,
                    email,
                    phone,
                    service,
                    subject,
                    message,
                })
            );

            const autoReplyHtml = await render(
                React.createElement(ContactAutoReply, {
                    name,
                })
            );

            const idempotencyKey = `contact-form/${randomUUID()}`;

            // Send both emails as a single atomic batch
            const { error } = await resend.batch.send([
                {
                    from:    `Phehlwana Group Website <${fromEmail}>`,
                    to:      [toEmail],
                    replyTo: email,
                    subject: `[Website Enquiry] ${subjectLine}`,
                    html:    notificationHtml,
                },
                {
                    from:    `Phehlwana Group Investments <${fromEmail}>`,
                    to:      [email],
                    replyTo: toEmail,
                    subject: 'Thank you for contacting Phehlwana Group Investments',
                    html:    autoReplyHtml,
                }
            ], {
                idempotencyKey
            });

            if (error) {
                console.error('Failed to send contact emails:', error);
                throw new ActionError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to send your message. Please try again.',
                });
            }

            return { success: true };
        },
    }),
};
