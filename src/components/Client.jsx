import Avatar from 'react-avatar';

const Client = ({ username }) => {
  return (
   
    <div className='flex '>
      <Avatar name={username}
      size={50}
      round="14px"
      className='mr-2  text-center '

       />
       <p className='mt-3'>{username}</p>
    </div>
  );
};

export default Client;


