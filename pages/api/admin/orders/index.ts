import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IOrder } from '../../../../interfaces/order';
import { Order } from '../../../../models';

type Data = { message: string } | IOrder | IOrder[];

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getOrders(request, response);
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getOrders = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  await db.connect();
  const orders = await Order
    .find()
    .sort({ createdAt: 'desc' })
    .select('-__v')
    .populate('user', 'name email')
    .lean();
  await db.disconnect();

  return response.status(200).json(orders);
};

export default handler;
