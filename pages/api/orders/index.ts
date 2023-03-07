import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { db } from '../../../database';
import { Order, Product } from '../../../models';
import { IOrder } from '../../../interfaces';

type Data = { message: string; } | IOrder;

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'POST':
      return createRouteLoader(request, response);
  
    default:
      return response.status(400).json({ message: 'Bad Request' });
  }
};

const createRouteLoader = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const { orderItems, total } = request.body as IOrder;

  const session = await getSession({ req: request });

  if (!session) {
    return response.status(401).json({
      message: 'You should be authorized in order to process an order'
    });
  }

  //* Products arrays from user
  const productsIds = orderItems.map(product => product._id);

  await db.connect();
  const dbProducts = await Product.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prevSubTotal, currentProduct) => {
      const currentPrice = dbProducts.find(p => p.id === currentProduct._id)?.price;

      if (!currentPrice) {
        throw new Error('Check Shopping Cart again, product does not exist!');
      }

      return prevSubTotal + (currentPrice * currentProduct.quantity);
    }, 0);

    
    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE ?? 0);

    const backendTotal = subTotal * ( taxRate + 1 );

    if (total !== backendTotal) {
      throw new Error('Total does not match with amount!');
    }

    //* Everything goes fine
    const userId = session.user.id;

    const newOrder = new Order({
      ...request.body,
      user: userId,
      isPaid: false,
    });

    //* Round to 2 decimals
    newOrder.total = Math.round(newOrder.total * 100) / 100;

    //* Save Order to database
    await newOrder.save();
    await db.disconnect();

    return response.status(201).json(newOrder);

  } catch (error) {

    db.disconnect();
    let message = 'Check server logs errors';
    if (error instanceof Error) message = error.message;
    console.log(error);
    response.status(400).json({ message })

  }

  return response.status(201).json(request.body);
}

export default handler;
