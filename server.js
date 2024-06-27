// import express from 'express'
// import http from 'http'
// import { Server } from 'socket.io'
// import { Actions } from './Actions.js'
// const app = express()
// const server = http.createServer(app)
// const io = new Server(server)



// const userSocketMap = {}
// const getAllConnectedClients=(roomId)=>{
   
//     return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId)=>{
//         return {
//             socketId,
//             username:userSocketMap[socketId]
//         }
//     })
// }

// io.on('connection',(socket)=>{
//     console.log('socket connection established',socket.id)


   
//     // listeing to the connection actions

//     socket.on(Actions.JOIN,({roomId, username})=>{


       
//     // Ensure no duplicate connections for the same user
//     const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
//     console.log(existingSocketName, "name");

//     if (existingSocketName) {
//       // Send an error message to the client and disconnect the socket
//       socket.emit('error', { message: 'Username already taken' });
//       console.log(`Username ${username} already taken`);
//       socket.disconnect(true);
//       return;
//     }


//         // add the object in the form of the id:username in the userSocketMap
//         userSocketMap[socket.id] = username;
//         // join the room 
//         socket.join(roomId)
//         console.log(`${username} joined room ${roomId}`)
//         const clients = getAllConnectedClients(roomId)
//         console.log(clients, "all cleints")
//         clients.forEach(({socketId}) => {
//             io.to(socketId).emit(Actions.JOINED, {
//                 // list of all the clients with their username and socket-id
//                 clients,
//                  username,
//                   socketId:socket.id
//             })
            
//         });
//     })


//     // diconnecting from the rooms
//         socket.on('disconnecting',()=>{
//             console.log('socket disconnection')
//             const rooms = [...socket.rooms];
//             rooms.forEach((roomId)=>{
//                 socket.in(roomId).emit(Actions.DISCONNECTED,{
//                     socketId:socket.id,
//                     username:userSocketMap[socket.id]
//                     })
//                 })
//                 delete userSocketMap[socket.id];
//                 socket.leave();
//             })


//             // listening for diconnected
//             socket.on('disconnect',()=>{
//               console.log('socket disconnected')
//               })


//        })
// server.listen(3000, ()=>{
//     console.log('Server is running on port 3000')
// })

import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { Actions } from './Actions.js'
const app = express()
const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => {
            return {
                socketId,
                username: userSocketMap[socketId],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(Actions.JOIN, ({ roomId, username }) => {
        const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
        if (existingSocketName) {
            socket.emit('error', { message: 'Username already taken' });
            socket.disconnect(true);
            return;
        }

        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(Actions.JOINED, {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(Actions.CODE_CHANGE, { code });
    });

    socket.on(Actions.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(Actions.CODE_CHANGE, { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(Actions.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
        delete userSocketMap[socket.id];
        socket.leave();
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
