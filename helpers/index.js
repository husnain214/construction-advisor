import { jwtVerify } from 'jose';

const getTokenData = async (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    console.log('irl', request.cookies.get('token'));
    const decodedToken = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SECRET_KEY),
    );
    return decodedToken.payload;
  } catch (error) {
    throw new Error(error.message);
  }
};

const formatTime = (time) => {
  return new Date(time).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const helpers = { getTokenData, formatTime };

export default helpers;
