import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const Client = ({ username }) => {
  console.log(username, "this is username");

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    const initials = name
      .split(' ')
      .map(word => word[0])
      .join('');
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: initials,
    };
  }

  return (
    <div>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar {...stringAvatar(username)} />
        <Typography variant="body1">{username}</Typography>
      </Stack>
    </div>
  );
} 

export default Client;
