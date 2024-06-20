import React from 'react'
// import Avatar from 'react-avatar'

const Client = ({username}) => {
    console.log(username)
  return (
    <div>

        {username.map((user)=>{
          return(
            <div>
              <p>
                {user}
                </p>
            </div>
          )
        })}

    </div>
  )
}

export default Client
