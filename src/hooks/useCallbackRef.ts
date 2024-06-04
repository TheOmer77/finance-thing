import { useCallback, useState } from 'react';

export const useCallbackRef = <T>() => {
  const [value, setValue] = useState<T>();
  const ref = useCallback((value: T) => setValue(value), []);

  return [ref, value] satisfies [ref: typeof ref, value: typeof value];
};
