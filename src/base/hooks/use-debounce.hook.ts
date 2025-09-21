import { useEffect, useState } from 'react';

/**
 * Custom React hook that debounces a value by a specified delay.
 *
 * @template T - The type of the value to debounce.
 * @param value - The value to debounce.
 * @param delay - The debounce delay in milliseconds.
 * @returns The debounced value, which updates only after the specified delay has elapsed since the last change.
 *
 * @example
 * import { useState } from 'react';
 * function SearchInput() {
 *   const [value, setValue] = useState('');
 *   const debouncedValue = useDebounce(value, 300); // Debounce 300 milliseconds
 *
 *   useEffect(() => {
 *     if (debouncedValue !== '') {
 *       searchByTitle(debouncedValue)
 *     }
 *   }, [debouncedValue])
 *
 *   return (
 *     <input
 *       value={value}
 *       onChange={(e) => setValue(e.target.value)}
 *     />
 *   );
 * }
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
