import { PROMISE_REJECT_ERROR } from '@/constants/api';
import type { ResolvedOrError } from '@/types/api';

export const isErrorObj = <T>(
  value: ResolvedOrError<Promise<T>>
): value is typeof PROMISE_REJECT_ERROR =>
  typeof value === 'object' && value !== null && 'error' in value;
