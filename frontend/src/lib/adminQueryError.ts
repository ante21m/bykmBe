/**
 * Turns an RTK Query `fetchBaseQuery` rejection into something an admin can
 * act on.
 *
 * Why this exists: the admin edit pages used to collapse every failure into
 * "not found". A 500 from the server, a dead network, and a genuinely
 * missing record all rendered the same sentence, so a broken deploy looked
 * like missing data.
 *
 * The case that matters most on cPanel: LiteSpeed answers a crashed Node
 * process with a plain-text `Internal Server Error` body. `fetchBaseQuery`
 * then fails to parse it and reports `status: 'PARSING_ERROR'` with the
 * real code in `originalStatus`. Treating that as an unknown string status
 * loses the 500 entirely, which is the exact failure this is meant to
 * surface.
 */

export type QueryErrorKind =
  | 'not-found'
  | 'unauthorized'
  | 'server'
  | 'parse'
  | 'network'
  | 'unknown';

export interface QueryErrorInfo {
  kind: QueryErrorKind;
  /** Numeric HTTP status when one could be determined. */
  status?: number;
  /** Short label for the heading. */
  title: string;
  /** One line an admin can act on. */
  detail: string;
}

type Loose = {
  status?: unknown;
  originalStatus?: unknown;
  data?: unknown;
  error?: unknown;
};

function asString(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() !== '' ? v : undefined;
}

/** Pulls a human-readable message out of whatever shape the body arrived in. */
function bodyMessage(data: unknown): string | undefined {
  if (typeof data === 'string') {
    // LiteSpeed's plain-text error page lands here.
    const trimmed = data.trim();
    return trimmed !== '' && trimmed.length <= 300 ? trimmed : undefined;
  }
  if (data && typeof data === 'object') {
    const rec = data as Record<string, unknown>;
    const msg = rec.message;
    if (typeof msg === 'string' && msg.trim() !== '') return msg;
    // NestJS validation errors arrive as an array of strings.
    if (Array.isArray(msg)) {
      const parts = msg.filter((m): m is string => typeof m === 'string');
      if (parts.length) return parts.join('; ');
    }
  }
  return undefined;
}

export function describeQueryError(error: unknown): QueryErrorInfo {
  if (!error || typeof error !== 'object') {
    return {
      kind: 'unknown',
      title: 'Something went wrong',
      detail: 'The request failed for an unrecognised reason.',
    };
  }

  const e = error as Loose;
  const rawStatus = e.status;

  // Non-numeric statuses are RTK Query's own sentinel values.
  if (typeof rawStatus === 'string') {
    switch (rawStatus) {
      case 'PARSING_ERROR': {
        const original =
          typeof e.originalStatus === 'number' ? e.originalStatus : undefined;
        const body = bodyMessage(e.data);
        if (original === 404) {
          return {
            kind: 'not-found',
            status: 404,
            title: 'Not found',
            detail: 'This record no longer exists.',
          };
        }
        return {
          kind: 'parse',
          status: original,
          title: original ? `Server error ${original}` : 'Unreadable response',
          detail:
            body ??
            (original
              ? `The server returned ${original} with a body that is not valid JSON. This usually means the app crashed before it could reply — check the error log.`
              : 'The server returned a response that is not valid JSON.'),
        };
      }
      case 'FETCH_ERROR':
      case 'TIMEOUT_ERROR':
        return {
          kind: 'network',
          title: 'Cannot reach the API',
          detail:
            rawStatus === 'TIMEOUT_ERROR'
              ? 'The request timed out before the API responded.'
              : 'The API could not be reached. It may be restarting or the API URL may be wrong.',
        };
      default:
        return {
          kind: 'unknown',
          title: 'Request failed',
          detail: asString(rawStatus) ?? 'The request failed.',
        };
    }
  }

  if (typeof rawStatus !== 'number') {
    return {
      kind: 'unknown',
      title: 'Request failed',
      detail: bodyMessage(e.data) ?? asString(e.error) ?? 'The request failed.',
    };
  }

  const detail = bodyMessage(e.data) ?? asString(e.error);

  if (rawStatus === 404) {
    return {
      kind: 'not-found',
      status: 404,
      title: 'Not found',
      detail: 'This record no longer exists.',
    };
  }

  if (rawStatus === 401 || rawStatus === 403) {
    return {
      kind: 'unauthorized',
      status: rawStatus,
      title: 'Not signed in',
      detail: 'Your session has expired. Sign in again and retry.',
    };
  }

  if (rawStatus >= 500) {
    return {
      kind: 'server',
      status: rawStatus,
      title: `Server error ${rawStatus}`,
      detail:
        detail ??
        'The server failed to handle this request. The cause is in the server error log.',
    };
  }

  return {
    kind: 'unknown',
    status: rawStatus,
    title: `Request failed (${rawStatus})`,
    detail: detail ?? 'The server rejected the request.',
  };
}
