export const DATE_FORMAT = 'yyyy-MM-dd';

export const PROMISE_REJECT_ERROR = { error: 'Something went wrong.' } as const;
/** Either the awaited type of `T` or a generic error object.  */
export type ResolvedOrError<T> = Awaited<T> | typeof PROMISE_REJECT_ERROR;
