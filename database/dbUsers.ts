import { db } from '.';
import { User } from '../models';
import bcrypt from 'bcryptjs';

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();
  const user = await User.findOne({ email }).lean();
  await db.disconnect();

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password!)) return null;

  return {
    id: user._id,
    name: user.name, 
    email: user.email.toLowerCase(),
    role: user.role,
  };
};
