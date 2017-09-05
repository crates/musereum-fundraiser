export const REQUEST_STATUS_TYPES = [
  1, // Waiting for PO
  2, // Waiting for architect
  3, // In queue
  4  // Closed
];

export const REQUEST_COLUMN_TYPES = [
  1, // New requests
  2, // In progress
  3, // Done
  4, // Release
  5, // Ready for QA
  6  // Ready for deploy
];


export const TASK_TYPE_TYPES_HASH = {
  1: 'task',
  2: 'bug',
  3: 'tech'
};
export const TASK_TYPE_TYPES = Object.keys(TASK_TYPE_TYPES_HASH);

export const TASK_ESTIMATE_TYPES_HASH = {
  1: '8',
  2: 'S',
  3: 'M',
  4: 'L',
  5: 'XL',
  6: 'XXL'
}
export const TASK_ESTIMATE_TYPES = Object.keys(TASK_ESTIMATE_TYPES_HASH);

export const TASK_COLUMN_TYPES = [
  1, // Backlog
  2, // In progress
  3  // Done
];
