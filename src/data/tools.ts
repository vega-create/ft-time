export interface Tool { name: string; slug: string; description: string; icon: string; category: string; }
export interface Category { id: string; name: string; icon: string; }

export const categories: Category[] = [
  { id: 'clock', name: 'Clocks & Zones', icon: '🕐' },
  { id: 'timer', name: 'Timers & Counters', icon: '⏱️' },
  { id: 'calc', name: 'Date Calculators', icon: '📅' },
  { id: 'convert', name: 'Time Conversion', icon: '🔄' },
];

export const tools: Tool[] = [
  { name: 'World Clock', slug: 'world-clock', description: 'View current time across multiple cities and timezones.', icon: '🌍', category: 'clock' },
  { name: 'Timezone Converter', slug: 'timezone-converter', description: 'Convert time between different timezones instantly.', icon: '🔄', category: 'clock' },
  { name: 'Meeting Planner', slug: 'meeting-planner', description: 'Find the best meeting time across timezones.', icon: '📋', category: 'clock' },
  { name: 'Countdown Timer', slug: 'countdown-timer', description: 'Set a countdown timer with alarm notification.', icon: '⏳', category: 'timer' },
  { name: 'Stopwatch', slug: 'stopwatch', description: 'Precise stopwatch with lap times.', icon: '⏱️', category: 'timer' },
  { name: 'Pomodoro Timer', slug: 'pomodoro-timer', description: 'Focus timer with work and break intervals.', icon: '🍅', category: 'timer' },
  { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate exact age in years, months, and days.', icon: '🎂', category: 'calc' },
  { name: 'Date Difference', slug: 'date-difference', description: 'Calculate days, weeks, and months between two dates.', icon: '📏', category: 'calc' },
  { name: 'Date Add/Subtract', slug: 'date-add', description: 'Add or subtract days, weeks, or months from a date.', icon: '➕', category: 'calc' },
  { name: 'Unix Timestamp', slug: 'unix-timestamp', description: 'Convert between Unix timestamps and human dates.', icon: '🔢', category: 'convert' },
  { name: 'Time Unit Converter', slug: 'time-unit-converter', description: 'Convert between seconds, minutes, hours, days, and more.', icon: '⚡', category: 'convert' },
  { name: 'Week Number', slug: 'week-number', description: 'Find the ISO week number for any date.', icon: '📆', category: 'convert' },
];

export function getToolsByCategory(categoryId: string): Tool[] {
  return tools.filter(t => t.category === categoryId);
}
