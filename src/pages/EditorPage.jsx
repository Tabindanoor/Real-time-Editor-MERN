// import { FaCode } from "react-icons/fa";
// import Client from "../components/Client";
// import { useEffect, useMemo, useRef, useState } from "react";
// import Editor from "../components/Editor";
// import { initSocket } from "../socket";
// import { Actions } from "../../Actions";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useParams } from "react-router-dom";

// const EditorPage = () => {
//   const socketRef = useRef(null);
//   const location = useLocation();
//   const reactNavigator = useNavigate();
  

//   const [clients, setClients] = useState([]);

//   const {id} = useParams()
//   console.log(id, "data")



//   const [code, setCode] = useState("//code here ");
  
// // console.log(clients,"ye haun")
//   useEffect(() => {
//     const init = async () => {
//       socketRef.current = await initSocket();

//       const handleError = (err) => {
//         console.log("socket error", err);
//         toast.error("Connection failed, Try Again");
//         reactNavigator("/");      }; 

//       socketRef.current.on('connect_error', handleError);
//       socketRef.current.on('connect_failed', handleError);



//         // emitting join actions
//       socketRef.current.emit(Actions.JOIN, {
//         roomId: id,
//         // roomId: location.state.roomId,
//         username: location.state?.username
//       });


//       // listening for joined event
//       socketRef.current.on(Actions.JOINED, ({ clients, username, socketId }) => {
//         console.log(clients, username, socketId, "joined")
//         if (username !== location.state?.username) 
//           {        
//              toast.success(`${username} has joined the room `);
//           }
//         setClients(clients);
//       });

//       // listening for diconnecting room event
//       socketRef.current.on(Actions.DISCONNECTED,({socketId, username})=>{
//         // console.log(username, "why undefined")
//         console.log(username, socketId, "disconnect")

//         toast.success(`${username} left the room`);
//         setClients((pre)=>{
//           return pre.filter((client)=>client.socketId!==socketId)
//         })
      
//       })

//     };

  
//     init();
//     // return ()=>{
//     //   socketRef.current.disconnect();
//     //   socketRef.current.off(Actions.JOINED)
//     //   socketRef.current.off(Actions.DISCONNECTED)
//     //  }
  
//   }, []);

//   if (!location.state) {
//     return <Navigate to={"/"} />;
//   }

//   return (
//     <div className="flex md:flex-row flex-col h-screen text-gray-200">
//       <div className="w-full md:w-[20%] bg-gray-900 p-5 flex flex-col justify-between">
//         <div>
//           <h1 className="font-serif font-semibold text-xl">Let&#39;s Collab</h1>
//           <FaCode className="w-24 my-2 h-20 justify-center mx-auto" />
//           <h1>Connected</h1>
//           {clients.map((user) => 
         
//           (
//             <div key={user.socketId} className="flex justify-between my-2">
//               <Client username={user.username}  />
//               {/* <p>{user.socketId}</p> */}
//             </div>
//           ))}
//         </div>
        
//         <div className="flex flex-col">
//           <button className="bg-green-700 mt-2 p-2 rounded-xl font-semibold">
//             COPY ROOM ID
//           </button>
//           <button className="bg-white text-black mt-2 p-2 rounded-xl font-semibold">
//             Leave Room
//           </button>
//         </div>
//       </div>

//       <div className="w-full md:w-[80%] bg-gray-800 p-5">
//         {/* <Editor value={code} onChange={setCode} /> */}
//         <Editor socketRef={socketRef}  roomId={id} />
//       </div>
//     </div>
//   );
// };
// export default EditorPage;


import { FaCode } from "react-icons/fa";
import Client from "../components/Client";
import { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { io } from "socket.io-client";

import { Actions } from "../../Actions";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { id } = useParams();

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () => {
            // socketRef.current = await initSocket();

            socketRef.current = io('http://localhost:3000', {
                'force new connection': true,
                reconnectionAttempts: 'Infinity',
                timeout: 10000,
                transports: ['websocket'],
              });
            

            const handleError = (err) => {
                console.log("socket error", err);
                toast.error("Connection failed, Try Again");
                reactNavigator("/");
            };

            socketRef.current.on('connect_error', handleError);
            socketRef.current.on('connect_failed', handleError);

            socketRef.current.emit(Actions.JOIN, {
                roomId: id,
                username: location.state?.username
            });

            socketRef.current.on(Actions.JOINED, ({ clients, username, socketId }) => {
                if (username !== location.state?.username) {
                    toast.success(`${username} has joined the room `);
                }
                setClients(clients);
            });

            socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
                toast.success(`${username} left the room`);
                setClients((prev) => prev.filter((client) => client.socketId !== socketId));
            });
        };

        init();
        // return () =>{
        //   socketRef.current.disconnect();
        //   socketRef.current.off(Actions.JOIN);
        //   socketRef.current.off(Actions.DISCONNECTED);
        // }
    }, []);



    if (!location.state) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="flex md:flex-row flex-col h-screen text-gray-200">
            <div className="w-full md:w-[20%] bg-gray-900 p-5 flex flex-col justify-between">
                <div>
                    <h1 className="font-serif font-semibold text-xl">Let's Collab</h1>
                    <FaCode className="w-24 my-2 h-20 justify-center mx-auto" />
                    <h1>Connected</h1>
                    {clients.map((user) => (
                        <div key={user.socketId} className="flex justify-between my-2">
                            <Client username={user.username} />
                        </div>
                    ))}
                </div>

                <div className="flex flex-col">
                    <button className="bg-green-700 mt-2 p-2 rounded-xl font-semibold">
                        COPY ROOM ID
                    </button>
                    <button className="bg-white text-black mt-2 p-2 rounded-xl font-semibold">
                        Leave Room
                    </button>
                </div>
            </div>

            <div className="w-full md:w-[80%] bg-gray-800 p-5">
                <Editor socketRef={socketRef} roomId={id} />
            </div>
        </div>
    );
};

export default EditorPage;
