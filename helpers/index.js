import { jwtVerify } from 'jose';

const getTokenData = async (request) => {
  try {
    const token = request.cookies.get('token')?.value || '';
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

const sortMeasurements = (a, b) => {
  const getNumericValue = (measurement) => {
    const match = measurement.match(/[+-]?\d+(\.\d+)?/);
    return match ? parseFloat(match[0]) : 0;
  };

  const getMeasurementType = (measurement) => {
    const match = measurement.match(/[a-zA-Z]+/);
    return match ? match[0].toLowerCase() : '';
  };

  const aValue = getNumericValue(a);
  const bValue = getNumericValue(b);
  const aType = getMeasurementType(a);
  const bType = getMeasurementType(b);

  if (aType !== bType) {
    return bType.localeCompare(aType);
  }

  return aValue - bValue;
};

const helpers = { getTokenData, formatTime, sortMeasurements };

export default helpers;
