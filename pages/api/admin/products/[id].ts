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
    case 'POST':
      return createProduct(request, response);
    case 'PATCH':
      return updateProduct(request, response);
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getProduct = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const id = request.query.id as string;

  if (!isValidObjectId(id)) {
    return response.status(400).json({ message: `${id} - Is not a valid "Mongo ID"` });
  }

  await db.connect();
  const product = await Product.findById(id).select('-__v').lean();
  await db.disconnect();

  if (!product) {
    return response.status(404)
      .json({ message: `Order with ID: "${id}" not found!` });
  }

  return response.status(200).json(product);
};

const createProduct = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  const { images = [], slug = '' } = request.body as IProduct;

  if (images.length < 2) {
    return response.status(400).json({ message: "You must include at least 2 images!" });
  }  

  try {
    await db.connect();

    const productInDB = await Product.findOne({ slug }).lean();

    if (productInDB) {
      await db.disconnect();
      return response.status(400).json({ message: `Product with slug "${slug}" already exists!` });
    }

    const product = new Product(request.body);

    //* Save new product on database
    product.save();

    await db.disconnect();

    return response.status(201).json(product);

  } catch (error) {
    console.log(error);
    await db.disconnect();
    return response.status(400).json({ message: 'Check console error logs!' });
  }
};

const updateProduct = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const id = request.query.id as string;
  const { images = [] } = request.body as IProduct;

  if (!isValidObjectId(id)) {
    return response.status(400).json({ message: `${id} - Is not a valid "Mongo ID"` });
  }

  if (images.length < 2) {
    return response.status(400).json({ message: "You must include at least 2 images!" });
  }

  // TODO: Handle images

  try {
    await db.connect();

    const product = await Product.findOneAndUpdate({ _id: id }, request.body, { new: true });

    if (!product) {
      await db.disconnect();
      return response.status(404)
        .json({ message: `Order with ID: "${id}" not found!` });
    }

    // TODO: Delete pictures (Cloudinary)

    await db.disconnect();

    return response.status(200).json(product);

  } catch (error) {
    console.log(error);
    await db.disconnect();
    return response.status(400).json({ message: 'Check console error logs!' });
  }  
};

export default handler;
