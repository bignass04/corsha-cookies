import { server } from './src/mocks/server';

vi.mock('mocks/browser', () => ({
  browser: {
    start: vi.fn()
  }
}))

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
