import NextAuth from 'next-auth';
import { sha256 } from 'hash.js';

import  CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedinProvider from 'next-auth/providers/linkedin';
import GithubProvider from 'next-auth/providers/github';

import { PrismaClient } from '@prisma/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { google, facebook, github, linkedin, jwtSecret } from '../../../../config';

const prisma = new PrismaClient()

const hashFunction = (secret: string) => {
  return sha256().update(secret).digest('hex')
}

const Auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
  secret: jwtSecret,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com", required: true },
        password: {  label: "Password", type: "password", required: true, minLength: 8 },
      },
      async authorize(credentials) {

        const {
          createUser,
          getUserByEmail,
        } = await PrismaAdapter(prisma);

        const user = await getUserByEmail(credentials.email)

        // If the user doesn't exist, create new user
        if (!user) {
          return Promise.resolve(await createUser({
            email: credentials.email,
            password: hashFunction(credentials.password),
          }))
        }


        const isPasswordCorrect = hashFunction(credentials.password) === user.password
        if (!isPasswordCorrect) {
          return Promise.resolve(null)
        }

        return Promise.resolve(user)
      },
    }),
    GoogleProvider({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
    }),
    FacebookProvider({
      clientId: facebook.clientId,
      clientSecret: facebook.clientSecret,
    }),
    LinkedinProvider({
      clientId: linkedin.clientId,
      clientSecret: linkedin.clientSecret,
    }),
    GithubProvider({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
  ],
})

export default Auth