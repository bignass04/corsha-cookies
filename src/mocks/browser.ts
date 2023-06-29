import { setupWorker, type SetupWorkerApi } from 'msw'
import { handlers } from './handlers'

export const browser: SetupWorkerApi = setupWorker(...handlers)
