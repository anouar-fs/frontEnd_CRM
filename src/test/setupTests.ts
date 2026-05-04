import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './mocks/server'
import { vi } from 'vitest';

vi.stubEnv('VITE_BACK_END_API_URL', 'http://localhost:7047');

// start MSW BEFORE tests run
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

// reset handlers after each test
afterEach(() => server.resetHandlers())

// close server after all tests
afterAll(() => server.close())