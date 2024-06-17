
import { useState } from 'react';
import "./Home.css";
import { FaSun, FaMoon, FaCode } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate= useNavigate();
  const [theme, setTheme] = useState('black-theme');

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'black-theme' ? 'white-theme' : 'black-theme'));
  };

  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("")
 

  const createNewRoom=(e)=>{
    e.preventDefault();
    const id = uuidv4();
    setRoomId(id); 
    toast.success("created new room")

  }
  const joinRoom=()=>{
    if(roomId.trim()==="" || username.trim()===""){
        toast.error("please fill all the fields")
        }
    else{
            navigate(`/editor/${roomId}`, { state: { username } });
            }
  }

  const handleEnter = (e)=>{


    //both are ok key and code  


    // console.log(e.code,"code")
    // console.log(e.key,"key")

    if(e.key === "Enter"){
        joinRoom();
        }
  }

  return (
    <div className={`${theme}  text-center`}  >
        <div>

       
      <div id="switch" onClick={changeTheme}>
        {theme === 'black-theme' ? <FaSun clas /> : <FaMoon />}
      </div>
      <div className="container">
        <div className="card">
          <div className="card__top">
            <img
              src="https://cdn.pixabay.com/photo/2016/10/26/23/24/colors-1772977_1280.jpg"
              alt="Sky"
            />
            <div className="profile__photo  w-24 h-24 rounded-full ">
              <FaCode className='w-24 h-24 p-2 rounded-full'/>
            </div>
          </div>
          <div className="card__content">
            <h2 className='text-xl font-semibold'>Let&#39;s Collabe</h2>
            <h2>Paste Invitation ROOM ID</h2>
            <br />
                <div>
                    <input type="text"  
                    onChange={(e)=>setRoomId(e.target.value)} 
                     value={roomId}
                      className=" font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                      placeholder="ROOM ID"
                       required
                       onKeyUp={handleEnter} />
                
                    <input type="text" 
                     onChange={(e)=>setUsername(e.target.value)} 
                      value={username}
                       className=" font-medium bg-gray-50 border border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                       placeholder="USERNAME" 
                       required 
                       onKeyUp={handleEnter} />
                </div>
            
           
           
            
            <button  onClick={joinRoom} className="button font-semibold  rounded-2xl ">
              Join 
            </button>
            {/* <Link  onClick={joinRoom} className="button bg-black py-3 px-7 mt-3 rounded-2xl ">
              Join
            </Link> */}
            <p>If you don&#39;t have an invite create <button  onClick={createNewRoom} className='text-green-800 underline'>new room</button> </p>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default Home;

