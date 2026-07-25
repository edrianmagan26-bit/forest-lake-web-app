import { useEffect, useRef, useCallback } from 'react';

export default function usePolling(callback, interval = 3000) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();
    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
}

// Helper: only update state if data actually changed
export function updateIfChanged(setter, newData) {
  setter(prev => {
    const prevStr = JSON.stringify(prev);
    const newStr = JSON.stringify(newData);
    return prevStr === newStr ? prev : newData;
  });
}
