import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { checkHash } from '../../../utils/password';

import { env } from '../../../../next.config.js';

const {
  google,
  authSecret,
} = env;

const passwordMinLength = 8;

const prisma = new PrismaClient();

const Auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true
  },
  secret: process.env.AUTH_SECRET,
  jwt:{
    secret: process.env.JWT_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
          required: true
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true,
          minLength: passwordMinLength
        }
      },
      async authorize(credentials) {
        //authorize is a required function to do the verification, and this is a callback
        // it needs to return sth. Return a user if we may login. Return null/false if we may not.
        const { getUserByEmail } = PrismaAdapter(prisma);

        const user = await getUserByEmail(credentials.email);

        if (!user) return null;

        const isPasswordCorrect = checkHash(
          credentials.password,
          user.password as string
        );
        if (!isPasswordCorrect) return null;

        return user;
      }
    }),
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
    }),
  ],
  pages:{
    signIn: '../../auth/login',
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    }
  },
});

export default Auth;
