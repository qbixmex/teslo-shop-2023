import jwt from 'jsonwebtoken';

export const signToken = (_id: string, email: string): string => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("There's no secret seed - Check environment variables");
  }

  return jwt.sign(
    //* Payload
    {_id, email},

    //* Seed
    process.env.JWT_SECRET_SEED,

    //* Options
    {
      expiresIn: '2h'
    }
  );
};
