import React from 'react';

interface NumberedCardProps {
  number: number;
  children: React.ReactNode;
  className?: string;
}

export function NumberedCard({ number, children, className = '' }: NumberedCardProps) {
  return (
    <div className={`relative bg-white border border-navy-100 border-t-4 border-t-forest-700 p-6 hover-lift group ${className}`}>
      <div className="absolute top-0 right-0 w-12 h-12 bg-navy-900 -skew-x-[30deg] -translate-y-1/2 translate-x-3 flex items-center justify-center">
        <span className="skew-x-[30deg] text-gold-400 font-bold text-xs">{String(number).padStart(2, '0')}</span>
      </div>
      {children}
    </div>
  );
}
