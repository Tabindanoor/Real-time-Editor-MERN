
import { useState } from 'react';
import "./Home.css";
import { FaSun, FaMoon, FaCode } from 'react-icons/fa';

const Home = () => {
  const [theme, setTheme] = useState('black-theme');

  const changeTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'black-theme' ? 'white-theme' : 'black-theme'));
  };

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
                    <input type="text" id="first_name" className=" font-medium bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ROOM ID" required />
                
                    <input type="text" id="first_name" className=" font-medium bg-gray-50 border border-gray-300 mt-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="USERNAME" required />
                </div>
            
           
           
            
            <a href="#" className="button  rounded-2xl ">
              Join
            </a>
            <p>If you don&#39;t have an invite create <span className='text-green-800 underline'>new room</span> </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;


// import  { useState } from 'react';
// import './Home.css'; // This will only contain the global styles and imports
// import { FaMoon, FaSun } from 'react-icons/fa';
// // import { FaSun, FaMoon, FaMapMarkerAlt, FaBuilding, FaEnvelope, FaCode } from 'react-icons/fa';

// const Home = () => {
//   const [theme, setTheme] = useState('black-theme');

//   const changeTheme = () => {
//     setTheme(theme === 'black-theme' ? 'white-theme' : 'black-theme');
//   };

//   return (
//     <div className={theme}>
//       <div id="switch" onClick={changeTheme}>
//         <i className={`fas ${theme === 'black-theme' ? <FaSun/> : <FaMoon/>}`}></i>

//       </div>
//       <div className="container">
//         <div className="card">
//           <div className="card__top">
//             <img src="https://cdn.pixabay.com/photo/2016/10/26/23/24/colors-1772977_1280.jpg" alt="Sky"/>
//             <div className="profile__photo">
//               <img src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Profile Photo"/>
//             </div>
//           </div>
//           <div className="card__content">
//             <h2>Alison Doe</h2>
//             <h3>Web Designer</h3>
//             <p><span><i className="fas fa-map-marker-alt"></i></span>Paris, France</p>
//             <p><span><i className="far fa-building"></i></span>Fantasy Company Inc.</p>
//             <p><span><i className="far fa-envelope"></i></span><a href="#">alison@fantasy.com</a></p>
//             <a href="#" className="button">Read More</a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
