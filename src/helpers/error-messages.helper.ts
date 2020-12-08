import { ErrorMessages } from '../constants/error-messages.enum';

export const formatErrorMessage = (message: ErrorMessages, errorMessage?: string): string => {
  const reason = errorMessage ? ` Reason: ${ errorMessage }` : '';

  return `${ message}.${ reason }`;
};
