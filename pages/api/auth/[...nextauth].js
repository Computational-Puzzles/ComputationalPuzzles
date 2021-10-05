import NextAuth from 'next-auth'
import { sha256 } from 'hash.js'

import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { google, facebook, github, linkedin, databaseUrl } from '../../../config'

const prisma = new PrismaClient()

const hashFunction = (secret) => {
  return sha256().update(secret).digest('hex')
}

const Auth = NextAuth({
  adapter: Adapters.Prisma.Adapter({
    prisma
  }),
  session: { jwt: true },
  database: databaseUrl,
  providers: [
    Providers.Credentials({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com", required: true },
        password: {  label: "Password", type: "password", required: true, minLength: 8 },
      },
      async authorize(credentials) {

        const {
          createUser,
          getUserByEmail,
        } = await PrismaAdapter(prisma)

        const user = await getUserByEmail(credentials.email)

        // If the user doesn't exist, create new user
        if (!user) {
          const newUser = await createUser({
            email: credentials.email,
            password: hashFunction(credentials.password),
          })

          console.log(newUser)

          return Promise.resolve(newUser)
        }


        const isPasswordCorrect = hashFunction(credentials.password) === user.password
        if (!isPasswordCorrect) {
          return Promise.resolve(null)
        }

        return Promise.resolve(user)
      },
    }),
    Providers.Google({
      clientId: google.clientId,
      clientSecret: google.clientSecret,
    }),
    Providers.Facebook({
      clientId: facebook.clientId,
      clientSecret: facebook.clientSecret,
    }),
    Providers.LinkedIn({
      clientId: linkedin.clientId,
      clientSecret: linkedin.clientSecret,
    }),
    Providers.GitHub({
      clientId: github.clientId,
      clientSecret: github.clientSecret,
    }),
  ],
})

export default Auth