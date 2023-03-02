import NextAuth, { Awaitable, RequestInternal, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email:',
          type: 'email',
          placeholder: 'bart-simpson@springfield.com'
        },
        password: { label: 'Password:', type: 'password' },
      },
      async authorize(credentials) {
        console.log({credentials});

        // TODO: Validate against database
        return {
          name: 'Bart Simpson',
          email: 'bart-simpson@springfield.com',
          role: 'admin',
        };
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],

  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // @deprecated
  },

  // Callbacks
  callbacks: {
    // TODO: Make some callbacks ...
  },
};

export default NextAuth(authOptions);
