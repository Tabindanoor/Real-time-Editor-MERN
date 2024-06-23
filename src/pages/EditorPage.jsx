import { FaCode } from "react-icons/fa";
// import code from "../assets/Code.png";
import Client from "../components/Client";
import { useEffect, useRef, useState } from "react";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { Actions } from "../../Actions";
import { useLocation } from "react-router-dom";
const EditorPage = () => {

  const socketRef = useRef(null);
const location = useLocation()
  useEffect(() => {
    const init =async()=>{
      socketRef.current = await initSocket();
      // socketRef.current.emit(Actions.JOIN,{
      //   roomId,
      //   username:location.state?.username
        
      // })

    }
    init();

  }, [])
  


  const [cleints, setCleints] = useState([
    { id: 1, name: "Tabinda Noor", age: 25 },
    { id: 2, name: "Talha Muslim", age: 30 },
    { id: 3, name: "Uroosa Muslim", age: 35 },
  ]);
  const [code, setCode] = useState("//code here ");
 

  return (
    <div className="flex md:flex-row flex-col h-screen text-gray-200">
      <div className="w-full md:w-[20%] bg-gray-900 p-5 flex flex-col justify-between">
        <div>
          <h1 className="font-serif font-semibold text-xl">Let&#39;s Collab</h1>
          <FaCode className="w-24 my-2 h-20 justify-center mx-auto" />
          <h1>Connected</h1>
          {cleints.map((user) => (
            <div key={user.id} className="flex justify-between my-2">
              <Client username={user.name} />
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

      <div className=" w-full md:w-[80%] bg-gray-800 p-5">

          <Editor value={code} onChange={setCode} />

      </div>
    </div>
  );
};

export default EditorPage;
