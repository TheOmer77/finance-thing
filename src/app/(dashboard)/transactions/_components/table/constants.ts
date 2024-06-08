export const INPUT_DATE_FORMAT = 'yyyy-MM-dd HH:mm:ss',
  OUTPUT_DATE_FORMAT = 'yyyy-MM-dd';
export const REQUIRED_FIELDS = ['amount', 'date', 'payee'] as const,
  OPTIONAL_FIELDS = ['notes'] as const,
  FIELDS = [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS] as const;
