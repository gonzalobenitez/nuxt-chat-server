import { map } from 'lodash'

const socketIo = (io) => {
  io.on('connection', (socket) => {
    socket.on('signal', (data) => {
      io.to(data.userId).emit('signal', {
        userId: socket.id,
        signal: data.signal
      })
    })

    socket.on('ready', (channelId) => {
      console.log(`ready: ${socket.id}, channel: ${channelId}`)
      if (socket.room) socket.leave(socket.room)
      socket.room = channelId
      socket.join(channelId)
      socket.room = channelId

      let users = map(io.sockets.adapter.rooms[channelId].sockets, (_, id) => {
        return { id }
      })

      console.log(`ready: ${socket.id}, channel: ${channelId}, users: ${JSON.stringify(users)}`)
      io.to(channelId).emit('users', {
        initiator: socket.id,
        users
      })
    })
  })
}

export default socketIo
