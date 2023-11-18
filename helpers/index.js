import jwt from 'jsonwebtoken';

const getTokenData = (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
    return decodedToken.id;
  } catch (error) {
    throw new Error(error.message);
  }
};

const helpers = { getTokenData };

export default helpers;
