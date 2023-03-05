import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { dbUsers } from '../../../database';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email:',
          type: 'email',
          //? If you want to put a placeholder to login
          //? placeholder: 'bart-simpson@springfield.com'
        },
        password: { label: 'Password:', type: 'password' },
      },
      async authorize(credentials, request) {
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );
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
  
  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  // Callbacks

  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // @deprecated
  },

  session: {
    maxAge: 2592000, // equals --> 30 days
    strategy: 'jwt',
    updateAge: 86400 // equals --> 1 day
  },

  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            token.user = await dbUsers.oAuthToDbUser(user?.email ?? '', user?.name ?? '');
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as string;
      session.user = token.user as any;
      return session;
    }
  },
};

export default NextAuth(authOptions);
