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


       
    // Ensure no duplicate connections for the same user
    const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
    console.log(existingSocketName, "name");

    if (existingSocketName) {
      // Send an error message to the client and disconnect the socket
      socket.emit('error', { message: 'Username already taken' });
      console.log(`Username ${username} already taken`);
      socket.disconnect(true);
      return;
    }


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


    // diconnecting from the rooms
        socket.on('disconnecting',()=>{
            console.log('socket disconnection')
            const rooms = [...socket.rooms];
            rooms.forEach((roomId)=>{
                socket.in(roomId).emit(Actions.DISCONNECTED,{
                    socketId:socket.id,
                    username:userSocketMap[socket.id]
                    })
                })
                delete userSocketMap[socket.id];
                socket.leave();
            })


            // listening for diconnected
            socket.on('disconnect',()=>{
              console.log('socket disconnected')
              })


       })
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
//     const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
//       console.log(existingSocketName, "name")

//       if (existingSocketName) {
//         // Send an error message to the client and disconnect the socket
//         socket.emit('error', { message: 'Username already taken' });
//         console.log(`Username ${username} already taken`);
//         socket.disconnect(true);
//         return;
//       }

   

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
//     const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
//     console.log(existingSocketName, "name");

//     if (existingSocketName) {
//       // Send an error message to the client and disconnect the socket
//       socket.emit('error', { message: 'Username already taken' });
//       console.log(`Username ${username} already taken`);
//       socket.disconnect(true);
//       return;
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
//     const rooms = [...socket.rooms].filter((roomId) => roomId !== socket.id); // Filter out the socket's own room

//     rooms.forEach((roomId) => {
//       socket.to(roomId).emit(Actions.DISCONNECTED, {
//         socketId: socket.id,
//         username: userSocketMap[socket.id]
//       });
//     });
//   });

//   socket.on('disconnecting', () => {
//     console.log('Socket disconnected', socket.id);
//     // Cleanup after disconnection
//     delete userSocketMap[socket.id];

//     // Notify remaining clients in the rooms
//     const rooms = [...socket.rooms];
//     rooms.forEach((roomId) => {
//       const clients = getAllConnectedClients(roomId);
//       clients.forEach(({ socketId }) => {
//         io.to(socketId).emit(Actions.DISCONNECTED, {
//           socketId: socket.id,
//           username: userSocketMap[socket.id]
//         });
//       });
//     });
//   });

//   // Error handling
//   socket.on('error', (err) => {
//     console.error('Socket encountered error: ', err);
//   });
// });

// server.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
