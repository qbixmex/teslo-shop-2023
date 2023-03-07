import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IPaypal } from '../../../interfaces';
import { Order } from '../../../models';

type Data =
  | { message: string }
  | { token: string };

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
};

const getPaypalBearerToken = async (): Promise<string|null> => {
  const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

  const base64Token = Buffer.from(`${ PAYPAL_CLIENT }:${ PAYPAL_SECRET }`, 'utf-8').toString('base64');

  const body = new URLSearchParams('grant_type=client_credentials');

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL ?? '', body, {
      headers: {
        'Authorization': `Basic ${ base64Token }`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return data.access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log("Unknown Error!");
      console.log(error);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  // TODO: Session Validation
  // TODO: Validate MongoId

  const paypalBearerToken = await getPaypalBearerToken();

  if (!paypalBearerToken) {
    return res.status(400).json({ message: 'Cannot confirm paypal token' });
  }

  const { transactionId = '', orderId = '' } = req.body;

  const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>(
    `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
      headers: {
        'Authorization': `Bearer ${ paypalBearerToken }`,
      }
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(401).json({ message: `Unknown Order: ${transactionId}` });
  }

  db.connect();
  const dbOrder = await Order.findById(orderId);

  if (!dbOrder) {
    db.disconnect();
    return res.status(404).json({ message: `Order does not exist: ${orderId}` });
  }

  if (dbOrder.total !== Number(data.purchase_units[0].amount.value)) {
    db.disconnect();
    return res.status(400).json({ message: 'Paypal and Order Amount are Different' });
  }

  dbOrder.transactionId = transactionId;
  dbOrder.isPaid = true;

  await dbOrder.save();

  await db.disconnect();

  return res.status(200).json({ message: 'Order Paid' });
};

export default handler;
