import { useCallback, useRef, useState } from 'react';

export function useSlider<T>(items: T[], step = 3) {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const maxIndex = Math.max(0, items.length - step);

  const scrollBy = useCallback(
    (dir: number) => {
      const el = ref.current;
      if (!el) return;
      const cardWidth = el.firstElementChild instanceof HTMLElement
        ? el.firstElementChild.offsetWidth + 16
        : 300;
      el.scrollBy({ left: dir * cardWidth * step, behavior: 'smooth' });
      setIndex((prev) => Math.max(0, Math.min(maxIndex, prev + dir * step)));
    },
    [maxIndex, step]
  );

  const canPrev = index > 0;
  const canNext = index < maxIndex;

  return { ref, scrollBy, canPrev, canNext, index, maxIndex };
}
