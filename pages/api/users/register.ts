import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs';
import { db } from '../../../database';
import { User } from '../../../models';
import { jwt } from '../../../utils';

type User = {
  name: string;
  email: string;
  password?: string;
  role: string;
};

type Data =
  | { message: string; }
  | { token: string; user: User; };

const handler = (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  switch(request.method) {
    case 'POST':
      return registerUser(request, response);
    default:
      return response.status(400).json({
        message: 'Endpoint does not exist!'
      });
  }
};

const registerUser = async (
  request: NextApiRequest,
  response: NextApiResponse<Data>
) => {
  const { email = '', password = '', name = '' } = request.body as User;

  if (name.length < 2) {
    return response.status(400).json({
      message: 'Name must be at least 3 characters long!'
    });
  }

  if (password.length < 8) {
    return response.status(400).json({
      message: 'Password must be at least 8 characters long!'
    });
  }

  // TODO: Validate Email
  // if (email) {
  //   return response.status(400).json({
  //     message: 'Email invalid format!'
  //   });
  // }

  db.connect();
  const user = await User.findOne({ email }).lean();

  if (user) {
    db.disconnect();
    return response.status(400).json({ message: 'Email already exists' });
  }

  const newUser = new User({
    name,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client'
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    db.disconnect();
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: 'Check server logs' });
  }

  const { _id, role } = newUser;

  return response.status(200).json({
    token: jwt.signToken(_id, email),
    user: { name, email, role },
  });
};

export default handler;
