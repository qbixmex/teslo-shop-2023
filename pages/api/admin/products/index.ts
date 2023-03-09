import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../../database';
import { IProduct } from '../../../../interfaces';
import { Product } from '../../../../models';

type Data = { message: string } | IProduct | IProduct[];

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch (request.method) {
    case 'GET':
      return getProducts(request, response);
    case 'POST':
      return createProduct(request, response);
    default:
      return response.status(400).json({ message: 'Unknown Request!' });
  }  
};

const getProducts = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  await db.connect();
  const products = await Product
    .find()
    .sort({ title: 'asc' })
    .select([
      '_id',
      'slug',
      'images',
      'title',
      'gender',
      'type',
      'inStock',
      'price',
      'sizes'
    ])
    .lean();
  await db.disconnect();

  // TODO: Get product images

  return response.status(200).json(products);
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
}

export default handler;
