import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type Data =
  | { message: string; }
  | {
    token: string;
    user: {
      name: string;
      email: string;
      role: string;
    }
  };

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch(request.method) {
    case 'GET':
      return checkJWT(request, response);
    default:
      return response.status(400).json({
        message: 'Endpoint does not exist!'
      });
  }
};

const checkJWT = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const { token = '' } = request.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return response.status(401).json({
      message: 'Authorization token is not valid!'
    });
  }

  db.connect();
  const user = await User.findById(userId).lean();
  db.disconnect();

  if (!user) {
    return response.status(400).json({
      message: 'User does not exits with id'
    });
  }

  return response.status(200).json({
    token: jwt.signToken(user._id, user.email),
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export default handler;
