import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Actions } from './Actions.js';
// import path from 'path';
// import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// doing things for deployement
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, 'dist')));

// // Serve index.html for all other routes
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });



const userSocketMap = {};

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
        (socketId) => ({
            socketId,
            username: userSocketMap[socketId],
        })
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on(Actions.JOIN, ({ roomId, username }) => {
       console.log(roomId,"room id")

        // const existingSocketId = Object.keys(userSocketMap).find(
        //     (key) => userSocketMap[key] === username
        // );

        // // If the user already exists, remove the old socket and join with the new one
        // if (existingSocketId) {
        //     console.log(`Removing old socket ${existingSocketId} for user ${username}`);
        //     io.sockets.sockets.get(existingSocketId).leave(roomId);
        //     delete userSocketMap[existingSocketId];
        // }

        console.log(roomId,"room id generated")
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
        console.log("receiving or not", code);
        socket.in(roomId).emit(Actions.CODE_CHANGE, { code });
    });


    // sync code

    // socket.on(Actions.SYNC_CODE, ({ socketId, code }) => {
    //     console.log("syncing the code here",code)
    //     io.to(socketId).emit(Actions.CODE_CHANGE, { code });

    // });
  

    // disocnnect


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

const PORT =  3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
