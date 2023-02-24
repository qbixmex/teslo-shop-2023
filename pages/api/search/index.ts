import { NextApiRequest, NextApiResponse } from 'next';

type Data = { message: string };

const handler = async (_request: NextApiRequest, response: NextApiResponse<Data>) => {
  return response.status(400).json({ message: 'Query was not given by the request!' });
};

export default handler;
