import { formatErrorMessage } from 'helpers/error-messages.helper';
import { ErrorMessages } from 'constants/error-messages.enum';

const message = ErrorMessages.GENERIC_SERVER_ERROR;
const errorMessage = 'Error message';

describe('tests for formatErrorMessage helper', () => {
  it('should add error message reason if it is provided', () => {
    expect(formatErrorMessage(message, errorMessage)).toBe(`${ message}. Reason: ${ errorMessage }`);
  });

  it('should not add error message reason if it is not provided', () => {
    expect(formatErrorMessage(message)).toBe(`${ message }.`);
  });
});
