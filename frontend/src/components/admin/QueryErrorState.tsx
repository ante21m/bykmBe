'use client';

import { Text } from '@mantine/core';
import { describeQueryError, type QueryErrorInfo } from '@/lib/adminQueryError';

/**
 * Inline variant for list pages, which render their error inside a Mantine
 * table body rather than replacing the page.
 */
export function QueryErrorInline({ error }: { error: unknown }) {
  const info = describeQueryError(error);
  return (
    <Text c="red" size="sm">
      {info.title} — {info.detail}
    </Text>
  );
}

/**
 * Renders a failed admin query.
 *
 * Only a genuine 404 is allowed to say "not found". Every other failure gets
 * its own message, because a 500, a crashed process, a dead network and an
 * expired session each need a different fix, and collapsing them into
 * "not found" is what made a broken deploy look like missing data.
 */
export default function QueryErrorState({
  info,
  notFoundLabel,
  onRetry,
}: {
  info: QueryErrorInfo;
  notFoundLabel: string;
  onRetry?: () => void;
}) {
  if (info.kind === 'not-found') {
    return (
      <div className="px-6 py-10 text-red-400 text-sm">{notFoundLabel}</div>
    );
  }

  return (
    <div className="px-6 py-10 text-sm">
      <p className="text-red-400">{info.title}</p>
      <p className="text-white/60 mt-1">{info.detail}</p>
      {onRetry && (
        <button onClick={onRetry} className="underline mt-3">
          Retry
        </button>
      )}
    </div>
  );
}
