import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(30000);
import dotenv from 'dotenv';
dotenv.config({
  path: '.env.test',
});
