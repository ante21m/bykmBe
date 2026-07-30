'use client';

import { Text, Collapse } from '@mantine/core';

export function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between py-2 px-1 text-left group"
    >
      <Text fw={600} size="sm" className="text-slate-700 group-hover:text-blue-600 transition-colors">
        {label}
      </Text>
      <svg
        width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
}

export function CollapsibleSection({ label, open, onToggle, children }: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-slate-200 rounded-md">
      <SectionHeader label={label} open={open} onToggle={onToggle} />
      <Collapse in={open}>
        <div className="px-3 pb-3 pt-1">{children}</div>
      </Collapse>
    </div>
  );
}
