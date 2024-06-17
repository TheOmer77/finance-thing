import { PROMISE_REJECT_ERROR, type ResolvedOrError } from '@/constants/api';

export const isErrorObj = <T>(
  value: ResolvedOrError<Promise<T>>
): value is typeof PROMISE_REJECT_ERROR =>
  typeof value === 'object' && value !== null && 'error' in value;
