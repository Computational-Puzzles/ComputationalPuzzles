import NextAuth from 'next-auth'
import { sha256 } from 'hash.js'

import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import {
  Credentials as CredentialProvider,
  Google as GoogleProvider,
  Facebook as FacebookProvider,
  LinkedIn as LinkedInProvider,
  GitHub as GitHubProvider,
} from 'next-auth/providers'

import { google, facebook, github, linkedin } from '../../../config'

const prisma = new PrismaClient()

const hashFunction = (secret) => {
  return sha256().update(secret).digest('hex')
}

const Auth = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { jwt: true },
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Username", type: "email", placeholder: "email@example.com" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials) {

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // If the user doesn't exist, create new user
        if (!user) {
          const newAccount = await prisma.account.create({
            data: {
              email: credentials.email,
              password: hashFunction(credentials.password),
            },
          })
        }

        const isPasswordCorrect = hashFunction(credentials.password) === user.password
        if (!isPasswordCorrect) {
          throw new Error('Invalid username or password')
        }

        return user
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
    LinkedInProvider({
      clientId: linkedin.clientId,
      clientSecret: linkedin.clientSecret,
    }),
    GitHubProvider({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
  ],
})

export default Auth