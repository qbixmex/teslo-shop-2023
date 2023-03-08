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
    case 'POST':
      return createOrder(request, response);
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

const createOrder = (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  return response.status(201).json({ message: 'Create Order' });
};

export default handler;
