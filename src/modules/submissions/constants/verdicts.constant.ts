export const verdicts = {
  IN_QUEUE: {
    id: 1,
    name: 'IN_QUEUE',
    shortName: 'IQ',
    description: 'In queue',
  },
  PROCESSING: {
    id: 2,
    name: 'PROCESSING',
    shortName: 'P',
    description: 'Processing...',
  },
  ACCEPTED: {
    id: 3,
    name: 'ACCEPTED',
    shortName: 'AC',
    description: 'Accepted',
  },
  WRONG_ANSWER: {
    id: 4,
    name: 'WRONG_ANSWER',
    shortName: 'WA',
    description: 'Wrong answer',
  },
  TIME_LIMIT_EXCEEDED: {
    id: 5,
    name: 'TIME_LIMIT_EXCEEDED',
    shortName: 'TLE',
    description: 'Time limit exceeded',
  },
  COMPILATION_ERROR: {
    id: 6,
    name: 'COMPILATION_ERROR',
    shortName: 'CE',
    description: 'Compilation error',
  },
  RUNTIME_ERROR: {
    id: 7,
    name: 'RUNTIME_ERROR',
    shortName: 'RE',
    description: 'Runtime error',
  },
} as const;
