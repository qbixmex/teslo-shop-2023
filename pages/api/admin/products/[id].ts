import { isValidObjectId } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IProduct } from '../../../../interfaces';
import { Product } from '../../../../models';

type Data = { message: string } | IProduct;

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getProduct(request, response);
    case 'PATCH':
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getProduct = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const id = request.query.id as string;

  if (!isValidObjectId(id)) {
    return response.status(400).json({ message: `${id} - Is not a valid "Mongo ID"` });
  }

  await db.connect();
  const product = await Product.findById({ _id: id }).select('-__v').lean();
  await db.disconnect();

  if (!product) {
    return response.status(404)
      .json({ message: `Order with ID: "${id}" not found!` });
  }

  return response.status(200).json(product);
};

export default handler;
