import { handleServiceError } from '../../utils/error';
import { HandledError } from '../../types/error';

describe('HTTP response status', () => {
  it('is 400', () => {
    expect(handleServiceError(400)).toStrictEqual({
      name: '400',
      message: 'Bad Request.',
      error: true
    } as HandledError);

    expect(handleServiceError(400, 'message')).toStrictEqual({
      name: '400',
      message: 'message',
      error: true
    } as HandledError);
  });
  it('is 404', () => {
    expect(handleServiceError(404)).toStrictEqual({
      name: '404',
      message: 'Not Found.',
      error: true
    } as HandledError);

    expect(handleServiceError(404, 'message')).toStrictEqual({
      name: '404',
      message: 'message',
      error: true
    } as HandledError);
  });
  it('is 500', () => {
    expect(handleServiceError(500)).toStrictEqual({
      name: '500',
      message: 'Server Error.',
      error: true
    } as HandledError);

    expect(handleServiceError(500, 'message')).toStrictEqual({
      name: '500',
      message: 'message',
      error: true
    } as HandledError);
  });
});
