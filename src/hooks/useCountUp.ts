"use client";

import { useEffect, useRef, useState } from "react";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start: boolean;
}

export function useCountUp({ end, duration = 1500, start }: UseCountUpOptions): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!start) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(progress * end));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [start, end, duration]);

  return count;
}
