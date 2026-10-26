import { createRouter } from '@tanstack/react-router'
import { routeTree } from '../routes/routeTree.gen.ts'

export const routerInstance = createRouter({ routeTree })
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof routerInstance
  }
}
