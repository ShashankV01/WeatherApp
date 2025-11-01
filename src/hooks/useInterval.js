import { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedRef = useRef();
  useEffect(() => {
    savedRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;
    const tick = () => savedRef.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}
