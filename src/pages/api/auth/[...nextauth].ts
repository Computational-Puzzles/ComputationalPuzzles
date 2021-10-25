import NextAuth from 'next-auth';
import { sha256 } from 'hash.js';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { env } from '../../../../next.config.js';
const { google, jwtSecret } = env;

const prisma = new PrismaClient();

const hashFunction = (secret: string) => {
  return sha256().update(secret).digest('hex');
};

const Auth = NextAuth({
  session: { jwt: true },
  secret: jwtSecret,
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
          minLength: 8
        }
      },
      async authorize(credentials) {
        const { getUserByEmail } = PrismaAdapter(prisma);

        const user = await getUserByEmail(credentials.email);

        if (!user) return null;

        const isPasswordCorrect =
          hashFunction(credentials.password) === user.password;
        if (!isPasswordCorrect) {
          return null;
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret
    })
  ]
});

export default Auth;
