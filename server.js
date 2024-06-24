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


io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on(Actions.JOIN, ({ roomId, username }) => {
        console.log(`JOIN action received from ${username} for room ${roomId}`);
        
        if (!userSocketMap[socket.id]) {
            userSocketMap[socket.id] = username;
            socket.join(roomId);
            console.log(`${username} joined room ${roomId}`);
        } else {
            console.log(`User ${username} is already connected with socket ID ${socket.id}`);
        }

        const clients = getAllConnectedClients(roomId);
        console.log('All clients:', clients);
        
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(Actions.JOINED, {
                clients,
                username,
                socketId: socket.id
            });
        });
    });

    socket.on('disconnecting', () => {
        console.log('Socket disconnecting:', socket.id);
        
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(Actions.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id]
            });
        });
        
        delete userSocketMap[socket.id];
        socket.leave();
    });
});



// io.on('connection',(socket)=>{
//     console.log('socket connection established',socket.id)

//     // listeing to the connection actions

//     socket.on(Actions.JOIN,({roomId, username})=>{

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

//        })
server.listen(3000, ()=>{
    console.log('Server is running on port 3000')
})


// import express from 'express';
// import http from 'http';
// import { Server } from 'socket.io';
// import { Actions } from './Actions.js';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const userSocketMap = {};

// const getAllConnectedClients = (roomId) => {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
//     return {
//       socketId,
//       username: userSocketMap[socketId]
//     };
//   });
// };

// io.on('connection', (socket) => {
//   console.log('Socket connection established', socket.id);

//   socket.on(Actions.JOIN, ({ roomId, username }) => {
//     // Ensure no duplicate connections for the same user
//     const existingSocketId = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);

//     if (existingSocketId) {
//       // Disconnect the previous socket
//       io.sockets.sockets.get(existingSocketId).disconnect(true);
//       delete userSocketMap[existingSocketId];
//     }

//     // Add the new connection
//     userSocketMap[socket.id] = username;
//     socket.join(roomId);
//     console.log(`${username} joined room ${roomId}`);

//     const clients = getAllConnectedClients(roomId);
//     console.log(clients, "all clients");

//     clients.forEach(({ socketId }) => {
//       io.to(socketId).emit(Actions.JOINED, {
//         clients,
//         username,
//         socketId: socket.id
//       });
//     });
//   });

//   socket.on('disconnecting', () => {
//     console.log('Socket disconnecting', socket.id);
//     const rooms = [...socket.rooms];
//     rooms.forEach((roomId) => {
//       socket.in(roomId).emit(Actions.DISCONNECTED, {
//         socketId: socket.id,
//         username: userSocketMap[socket.id]
//       });
//     });
//     delete userSocketMap[socket.id];
//     socket.leave();
//   });

//   socket.on('disconnect', () => {
//     console.log('Socket disconnected', socket.id);
//     // Additional cleanup if necessary
//   });

//   // Error handling
//   socket.on('error', (err) => {
//     console.error('Socket encountered error: ', err);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
