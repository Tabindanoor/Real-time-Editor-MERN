import { io } from "socket.io-client";
// the main function to create a socket connection
export const initSocket=async()=>{
    const options ={
        "force new connection" : true,
        "reconnectionAttempts": "Infinity",
        "timeout" : 10000,
        "transports" : ["websocket"],

    }

    return io("http://localhost:3000/",options)

} 