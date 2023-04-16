import { createServer } from 'miragejs'
import db from '@/mocks/db/db'
import loadDevelopmentDB from './mocks/db/development'

export function makeServer({ environment = 'development' } = {}) {
  loadDevelopmentDB(db)

  const server = createServer({
    environment,

    routes() {
      this.namespace = 'api'

      this.get('/test/:id', (schema, request) => ({
        status: 200,
        error: false,
        data: request.params.id,
      }))

      this.post('/test', () => ({
        status: 200,
        error: false,
        data: null,
      }))
    },
  })

  // server.timing = 3000;
  return server
}
