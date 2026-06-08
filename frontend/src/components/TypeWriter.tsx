'use client';

import { useState, useEffect } from 'react';

interface TypeWriterProps {
  strings: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
}

export function TypeWriter({ strings, className = '', speed = 80, deleteSpeed = 40, pauseTime = 2000 }: TypeWriterProps) {
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[index];
    if (!current) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (display.length < current.length) {
          setDisplay(current.slice(0, display.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (display.length > 0) {
          setDisplay(current.slice(0, display.length - 1));
        } else {
          setIsDeleting(false);
          setIndex((i) => (i + 1) % strings.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [display, index, isDeleting, strings, speed, deleteSpeed, pauseTime]);

  return (
    <span className={className}>
      {display}
      <span className="inline-block w-[2px] h-[1em] bg-gold-400 ml-1 animate-pulse align-middle" />
    </span>
  );
}
