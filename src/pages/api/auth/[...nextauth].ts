import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import GithubProvider from 'next-auth/providers/github';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import checkPassword from '../../../utils/checkPassword';

import {
  google,
  facebook,
  github,
  linkedin,
  authSecret
} from '../../../../config';

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

        const isPasswordCorrect = checkPassword(
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
    FacebookProvider({
      clientId: facebook.clientId,
      clientSecret: facebook.clientSecret
    }),
    LinkedinProvider({
      clientId: linkedin.clientId,
      clientSecret: linkedin.clientSecret
    }),
    GithubProvider({
      clientId: github.clientId,
      clientSecret: github.clientSecret
    })
  ]
});

export default Auth;
