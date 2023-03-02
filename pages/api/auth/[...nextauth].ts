import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
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
          id: 'abc123',
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

  callbacks: {
    async jwt({ token, account, user }) {
      if ( account ) {
        token.accessToken = account.access_token;
        switch (account.type) {
          case 'oauth':
            // TODO: Create user or check if exists in database
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.accessToken = token.accessToken as any;
      session.user = token.user as any;
      return session;
    }
  },
};

export default NextAuth(authOptions);
