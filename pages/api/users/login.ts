import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
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
    case 'POST':
      return loginUser(request, response);
    default:
      return response.status(400).json({
        message: 'Endpoint does not exist!'
      });
  }
};

const loginUser = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const { email = '', password = '' } = request.body;

  db.connect();
  const user = await User.findOne({ email }).lean();
  db.disconnect();

  if (!user) {
    return response.status(400).json({
      message: 'Email or Password not valid! - EMAIL'
    });
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return response.status(400).json({
      message: 'Email or Password not valid! - PASSWORD'
    });
  }

  const { role, name, _id } = user;

  return response.status(200).json({
    token: jwt.signToken(_id, email),
    user: { name, email, role },
  });
};

export default handler;
