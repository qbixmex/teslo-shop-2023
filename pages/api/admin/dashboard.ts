import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../database';
import { User, Order, Product } from '../../../models';

type Data =
  | { message: string }
  | {
    numberOfOrders: number;
    paidOrders: number; // isPaid true
    notPaidOrders: number;
    numberOfClients: number; // Role Client
    numberOfProducts: number;
    productsWithNoInventory: number; // 0
    lowInventory: number; // Products with 10 or less
  };

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getDashboardValues(request, response);
    default:
      return response.status(400).json({ message: 'Bad Request' });
  }
};

const getDashboardValues = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {

  await db.connect();
  const [
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    Order.count(),
    Order.find({ isPaid: true }).count(),
    User.find({ role: 'client' }).count(),
    Product.count(),
    Product.find({ inStock: 0 }).count(),
    Product.find({ inStock: { $lte: 10 } }).count(),
  ]);
  await db.disconnect();

  return response.status(200).json({
    numberOfOrders,
    paidOrders,
    notPaidOrders: numberOfOrders - paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  });
};

export default handler;
