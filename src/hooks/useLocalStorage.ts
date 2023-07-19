import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storedValue = localStorage.getItem(key);
  const initialData = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState<T>(initialData);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
}
