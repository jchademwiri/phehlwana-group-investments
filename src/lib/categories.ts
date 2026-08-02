// Single source of truth for project category display — badge/dot colors and
// filter order. Shared by the projects overview grid and the project detail
// template so the two can never drift out of sync with each other.

export const categoryList = [
  'All',
  'Construction',
  'Road',
  'Mechanical',
  'Cleaning',
  'Plant Hire',
  'Security',
] as const;

export const categoryColours: Record<string, { badge: string; dot: string }> = {
  Construction: {
    badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  Road: {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  Mechanical: {
    badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    dot: 'bg-purple-500',
  },
  Cleaning: {
    badge: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
    dot: 'bg-green-500',
  },
  'Plant Hire': {
    badge: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300',
    dot: 'bg-orange-500',
  },
  Security: {
    badge: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
    dot: 'bg-red-500',
  },
};
