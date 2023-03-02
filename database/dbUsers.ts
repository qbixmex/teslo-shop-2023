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

/**
 * Verify or Creates an OAuth User
 */
export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();
  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  const newUser = new User({
    name: oAuthName,
    email: oAuthEmail,
    password: '@',
    role: 'client'
  });

  await newUser.save();
  await db.disconnect();

  return {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  }
};