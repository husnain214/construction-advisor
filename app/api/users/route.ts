export const GET = () => {
  const result = JSON.stringify('Users GET method called');
  return new Response(result);
};

export const POST = () => {
  const result = JSON.stringify('Users POST method called');
  return new Response(result);
};
