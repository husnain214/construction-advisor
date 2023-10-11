export const GET = () => {
  const result = JSON.stringify('Users GET method called');
  return new Response(result);
};

export const PUT = () => {
  const result = JSON.stringify('Users PUT method called');
  return new Response(result);
};

export const DELETE = () => {
  const result = JSON.stringify('Users DELETE method called');
  return new Response(result);
};
