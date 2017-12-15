import config from 'config'
import turn from '../turn'

export default function () {
  const app = this
  const cfgIceServers = config.get('iceServers')
  // create service
  app.use('channels', {
    get: function (id, params) {
      const iceServers = turn.processServers(cfgIceServers)
      return Promise.resolve({
        id,
        iceServers
      })
    }
  })
}
