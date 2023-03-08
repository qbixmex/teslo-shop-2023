import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IUser } from '../../../interfaces';
import { User } from '../../../models';
import { isValidObjectId } from 'mongoose';

type Data = { message: string } | IUser | IUser[];
const handler = (request: NextApiRequest, response: NextApiResponse<Data>) => {
  switch(request.method) {
    case 'GET':
      return getUsers(request, response);
    case 'PATCH':
      return updateUsers(request, response);
    default:
      return response.status(400).json({ message: 'Bad Request' });
  }
};

const getUsers = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  await db.connect();
  const users = await User.find().select('-password -__v').lean();
  await db.disconnect();

  return response.status(200).json(users);
};

const updateUsers = async (request: NextApiRequest, response: NextApiResponse<Data>) => {
  const { userId, role } = request.body;

  if (!isValidObjectId(userId)) {
    return response.status(400).json({ message: `${userId} - Is not a valid "Mongo ID"` });
  }

  const validRoles = [ 'admin', 'client', 'super-user', 'seo' ];

  if (!validRoles.includes(role)) {
    return response.status(400)
      .json({ message: `Role "${role}" not allowed!, valid roles are: (${validRoles.join(', ')})` });
  }

  await db.connect();
  const user = await User.findById(userId).select('-password -__v');
  
  if (!user) {
    await db.disconnect();
    return response.status(404)
      .json({ message: `User with ID: "${userId}" not found!` });
  }

  // Update Role
  user.role = role;

  // Save changes to database
  await user.save();
  await db.disconnect();

  return response.status(200).json({ message: 'User Updated' });
};

export default handler;