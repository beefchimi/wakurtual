// This helper was adapted from:
// https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

interface BasicError {
  message: string;
}

type ErrorRecord = Record<string, unknown>;

export const GENERIC_ERROR_MESSAGE = 'An unknown error has occurred.';

export function assertBasicError(error: unknown): error is BasicError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ErrorRecord).message === 'string'
  );
}

export function convertUnknownError(error: unknown): BasicError {
  if (assertBasicError(error)) return error;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    // Fallback in case there is an error while stringifying.
    // Example: circular references.
    return new Error(String(error));
  }
}

export function getErrorMessage(error: unknown) {
  const {message} = convertUnknownError(error);
  return message ? message : GENERIC_ERROR_MESSAGE;
}
