import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection',(socket)=>{
    console.log('socket connection established',socket.id)
})



server.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})