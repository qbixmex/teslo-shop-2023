import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'POST':
      return createRouteLoader(request, response);
  
    default:
      return response.status(400).json({ message: 'Bad Request' })
  }
};

const createRouteLoader = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  return response.status(201).json({ message: 'Order ABC-123' });
}

export default handler;

