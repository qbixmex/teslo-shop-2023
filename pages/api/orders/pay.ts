import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | { message: string }

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
}

const payOrder = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  return res.status(201).json({ message: 'Created Order' });
};

export default handler;
