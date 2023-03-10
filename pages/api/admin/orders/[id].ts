import { isValidObjectId } from 'mongoose';
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
      return getOrder(request, response);
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getOrder = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const id = request.query.id as string;

  if (!isValidObjectId(id)) {
    return response.status(400).json({ message: `${id} - Is not a valid "Mongo ID"` });
  }

  await db.connect();
  const order = await Order
    .findById({ _id: id })
    .select('-__v')
    .populate('user', 'name email')
    .lean();  
  await db.disconnect();

  if (!order) {
    return response.status(404)
      .json({ message: `Order with ID: "${id}" not found!` });
  }

  return response.status(200).json(order);
};

export default handler;
