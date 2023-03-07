import { NextApiRequest, NextApiResponse } from 'next/types';
import paypal from '@paypal/checkout-server-sdk';
  
// Creating an environment
let clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT ?? '';
let clientSecret = process.env.PAYPAL_SECRET ?? '';

// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
let client = new paypal.core.PayPalHttpClient(environment);

type Data =
  | { message: string }
  | { id: string };

const handler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  switch (req.method) {
    case "POST":
      return payOrder(req, res);
    default:
      return res.status(400).json({ message: 'Bad Request' });
  }
};

const payOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "1.00",
          }
        }
      ]
    });
    const response = await client.execute(request);
    return res.status(201).json({ id: response.result.id });
};

export default handler;
