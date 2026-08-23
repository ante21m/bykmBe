'use client';
import { useState, useEffect, useRef } from 'react';

interface Props {
  value: string;
  unit: string;
}

export function AnimatedCounter({ value, unit }: Props) {
  const raw = value;
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
  const suffix = raw.replace(/[0-9.,]/g, '');
  const isDecimal = raw.includes('.');
  const decimalPart = isDecimal ? '.' + raw.split('.')[1] : '';

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 1500;
          const startTime = performance.now();

          function tick(now: number) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * num);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [num]);

  return (
    <div ref={ref} className="font-display text-5xl md:text-6xl font-bold text-gold-400 mb-2">
      {count}{decimalPart}<small className="text-2xl text-gold-400/70 ml-1">{suffix}{unit}</small>
    </div>
  );
}
