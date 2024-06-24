// import React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const Client = ({ username }) => {
//   // Function to generate a color from a string
//   const stringToColor = (string) => {
//     let hash = 0;
//     for (let i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let color = '#';
//     for (let i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     return color;
//   };

//   // Function to create an avatar with initials and background color
//   const stringAvatar = (name) => {
//     const initials = name
//       .split(' ')
//       .map((word) => word[0])
//       .join('');
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: initials,
//     };
//   };

//   return (
//     <Stack direction="row" spacing={2} alignItems="center">
//       <Avatar {...stringAvatar(username)} />
//       <Typography variant="body1">{username}</Typography>
//     </Stack>
//   );
// };

// export default Client;


// import  { useMemo } from 'react';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';

// const Client = ({ username }) => {
//   // Function to generate a color from a string
//   const stringToColor = (string) => {
//     let hash = 0;
//     for (let i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }
//     let color = '#';
//     for (let i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       color += `00${value.toString(16)}`.slice(-2);
//     }
//     return color;
//   };

//   // Function to create an avatar with initials and background color
//   const stringAvatar = (name) => {
//     const initials = name
//       .split(' ')
//       .map((word) => word[0])
//       .join('');
//     return {
//       sx: {
//         bgcolor: stringToColor(name),
//       },
//       children: initials,
//     };
//   };

//   const avatarProps = useMemo(() => stringAvatar(username), [username]);

//   return (
//     <Stack direction="row" spacing={2} alignItems="center">
//       <Avatar {...avatarProps} />
//       <Typography variant="body1">{username}</Typography>
//     </Stack>
//   );
// };

// export default Client;


import React, { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Client = ({ id, username }) => {
  // Function to generate a color from a string
  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  };

  // Function to create an avatar with initials and background color
  const stringAvatar = (name) => {
    const initials = name
      .split(' ')
      .map((word) => word[0])
      .join('');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  };

  const avatarProps = useMemo(() => stringAvatar(username), [username]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar {...avatarProps} />
      <Typography variant="body1">{username}</Typography>
    </Stack>
)};


export default Client;
