import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
const app = express()
const server = http.createServer(app)
const io = new Server(server)

io.on('connection',(socket)=>{
    console.log('new connection established',socket.id)
})

app.listen(5000, ()=>{
    console.log('Server is running on port 5000')
})