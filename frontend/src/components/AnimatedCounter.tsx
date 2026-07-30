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

  const [count, setCount] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const range = num - 1;
          const stepTime = Math.max(2000 / range, 16);
          let current = 1;
          const timer = setInterval(() => {
            current += 1;
            if (current >= num) {
              setCount(num);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, stepTime);
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
