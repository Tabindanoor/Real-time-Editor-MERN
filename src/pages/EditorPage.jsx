import { FaCode } from "react-icons/fa"
import code from "../assets/Code.png"
import Client from "../components/Client"
import { useState } from "react"

const EditorPage = () => {
  const [cleints, setCleints] = useState([
    {id:1,name:"John",age:25},
    {id:2,name:"Jane",age:30},
    {id:3,name:"Bob",age:35},

  ])
  return (
    <div className="flex h-screen text-gray-200 ">
      <div className=" w-[30%] bg-gray-900 p-5">
        {/* <img src={code} className="bg-white rounded-full text-center justify-center mx-auto" alt="" /> */}
              <h1 className="font-serif font-semibold text-xl  ">Let&#39;s Collab</h1>
              <FaCode className='w-24 my-2 h-20 justify-center mx-auto  '/>
        <h1>Connected</h1>
        {cleints.map((user)=>{
          return(
            <div key={user.id} className="flex justify-between my-2">
              <Client username={user.name}  key={user.id} />
              {/* <h1>{user.name}</h1>
              <h1>{user.age}</h1> */}
              </div>
              )
        })}
      </div> 

      <div className="w-[70%] bg-gray-800 p-5">
          <h1>Editor goes here </h1>
      </div>
    </div>
  )
}

export default EditorPage
