import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Actions } from './Actions.js'
const app = express()
const server = http.createServer(app)
const io = new Server(server)



const userSocketMap = {}
const getAllConnectedClients=(roomId)=>{
   
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId]
        }
    })
}

io.on('connection',(socket)=>{
    console.log('socket connection established',socket.id)

    // listeing to the connection actions

    socket.on(Actions.JOIN,({roomId, username})=>{

        // add the object in the form of the id:username in the userSocketMap
        userSocketMap[socket.id] = username;
        // join the room 
        socket.join(roomId)
        console.log(`${username} joined room ${roomId}`)
        const clients = getAllConnectedClients(roomId)
        console.log(clients, "all cleints")
        clients.forEach(({socketId}) => {
            io.to(socketId).emit(Actions.JOINED, {
                // list of all the clients with their username and socket-id
                clients,
                 username,
                  socketId:socket.id
            })
            
        });
    })

       })
        
    





server.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})