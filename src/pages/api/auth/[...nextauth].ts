import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { checkHash } from '../../../utils/password';

import { env } from '../../../../next.config.js';

const { google, authSecret } = env;

const passwordMinLength = 8;

const prisma = new PrismaClient();

const Auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    jwt: true
  },
  secret: authSecret,
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
      clientSecret: google.clientSecret
    })
  ],
  pages:{
    signIn: '/auth/login',
    error: '/auth/login',
  }
});

export default Auth;
