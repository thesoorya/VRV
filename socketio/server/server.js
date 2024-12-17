const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const PORT = 5000

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {

    socket.on('send_message', (data) => {
        io.emit('receive_message', { message: data })
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected')
    })
})

server.listen(PORT, () => {
    console.log('Server running on port:', PORT)
})