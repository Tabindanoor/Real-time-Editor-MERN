// import express from 'express'
// import http from 'http'
// import { Server } from 'socket.io'
// import { Actions } from './Actions.js'
// const app = express()
// const server = http.createServer(app);
// const io = new Server(server);

// const userSocketMap = {};

// function getAllConnectedClients(roomId) {
//     return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//         (socketId) => {
//             return {
//                 socketId,
//                 username: userSocketMap[socketId],
//             };
//         }
//     );
// }

// io.on('connection', (socket) => {
//     console.log('socket connected', socket.id);

//     socket.on(Actions.JOIN, ({ roomId, username }) => {
//         // const existingSocketName = Object.keys(userSocketMap).find((key) => userSocketMap[key] === username);
//         // if (existingSocketName) {
//         //     socket.emit('error', { message: 'Username already taken' });
//         //     socket.disconnect(true);
//         //     return;
//         // }

//         userSocketMap[socket.id] = username;
//         socket.join(roomId);
//         const clients = getAllConnectedClients(roomId);
//         clients.forEach(({ socketId }) => {
//             io.to(socketId).emit(Actions.JOINED, {
//                 clients,
//                 username,
//                 socketId: socket.id,
//             });
//         });
//     });

//     socket.on(Actions.CODE_CHANGE, ({ roomId, code }) => {
//         console.log("receiivng  or not",code)

//         socket.in(roomId).emit(Actions.CODE_CHANGE, { code });
//     });

//     // socket.on(Actions.SYNC_CODE, ({ socketId, code }) => {
//     //     io.to(socketId).emit(Actions.CODE_CHANGE, { code });
//     // });

//     socket.on('disconnecting', () => {
//         const rooms = [...socket.rooms];
//         rooms.forEach((roomId) => {
//             socket.in(roomId).emit(Actions.DISCONNECTED, {
//                 socketId: socket.id,
//                 username: userSocketMap[socket.id],
//             });
//         });
//         delete userSocketMap[socket.id];
//         socket.leave();
//     });
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => console.log(`Listening on port ${PORT}`));


import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { Actions } from './Actions.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
        console.log(roomId,"room id generated")
        const existingSocketName = Object.keys(userSocketMap).find(
            (key) => userSocketMap[key] === username
        );
        if (existingSocketName) {
            socket.emit('error', { message: 'Username already taken' });
            socket.leave();
            // return;
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
        console.log("receiving or not", code);
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
