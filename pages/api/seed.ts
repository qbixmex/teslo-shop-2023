import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { Product } from '../../models';

type Data = {
  message: string
};

 const handler = async (
  _request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  if (process.env.NODE_ENV === 'production') {
    return response.status(401).json({ message: 'Access Denied to this service' });
  }

  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(seedDatabase.initialData.products);
  await db.disconnect();

  response.status(200).json({ message: 'Process Done Successfully' });
};

export default handler;