import config from 'config'
import feathers from 'feathers'
import socketio from 'feathers-socketio'
import createServer from './server'
import handleSocket from './socket'
import services from './services'

const BASE_URL = config.get('baseUrl')
const SOCKET_URL = `${BASE_URL}/ws`
const PORT = process.env.PORT || 3050

console.log(`WebSocket URL: ${SOCKET_URL}`)
// create app
const app = feathers()
// configure socket io
app.configure(socketio({
  wsEngine: 'uws',
  path: SOCKET_URL
}, handleSocket))
// Import API Routes
app.configure(services)
// create server
const server = createServer(config, app)
// Listen the server
server.listen(PORT, () => console.log(`Listening on: ${PORT}`))
// setup server
app.setup(server)
