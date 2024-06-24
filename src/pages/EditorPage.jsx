import { FaCode } from "react-icons/fa";
import Client from "../components/Client";
import { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { Actions } from "../../Actions";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditorPage = () => {
  const socketRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();

  const [clients, setClients] = useState([]);
  const [code, setCode] = useState("//code here ");
  const handleError = (err) => {
    console.log("socket error", err);
    toast.error("Connection failed, Try Again");
    reactNavigator("/");
  }; 

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();


      socketRef.current.on('connect_error', handleError);
      socketRef.current.on('connect_failed', handleError);


      socketRef.current.emit(Actions.JOIN, {
        roomId: location.state.roomId,
        username: location.state?.username
      });


      // listening for joined event
      socketRef.current.on(Actions.JOINED, ({ clients, username, socketId }) => {
        if (username !== location.state?.username) {
          toast.success(`${username} has joined the room`);
        }
        setClients(clients);
      });

      // listening for diconnecting room event
      socketRef.current.on(Actions.DISCONNECTED,({socketId, username})=>{
        console.log(username, "why undefined")
        toast.success(`${username} left the room`);
        setClients((pre)=>{
          return pre.filter((client)=>client.socketId!==socketId)
        })
        reactNavigator("/");
      
      })

    };

    init();
  }, []);

  if (!location.state) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex md:flex-row flex-col h-screen text-gray-200">
      <div className="w-full md:w-[20%] bg-gray-900 p-5 flex flex-col justify-between">
        <div>
          <h1 className="font-serif font-semibold text-xl">Let&#39;s Collab</h1>
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
        <Editor value={code} onChange={setCode} />
      </div>
    </div>
  );
};

export default EditorPage;

