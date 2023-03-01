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

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("There's no secret seed - Check environment variables");
  }

  if (token.length <= 10) {
    return Promise.reject('JWT is not valid!');
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED ?? '', (error, payload) => {
        if (error) return reject('JWT is not valid!');
        const { _id } = payload as { _id: string };
        resolve(_id);
      });
    } catch (error) {
      reject('JWT is not valid!');
    }
  });
};
