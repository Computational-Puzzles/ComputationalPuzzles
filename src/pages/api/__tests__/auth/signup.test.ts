/**
 * @jest-environment node
 */
// Implementation get from https://stackoverflow.com/questions/61640829/how-can-i-test-express-server-with-supertest-in-next-js
import * as faker from 'faker';
import { PrismaClient } from '@prisma/client';
import signUpHandler from '../../auth/signup';
import { testClient } from "../../../../utils/test-client";
import * as dotenv from 'dotenv';
dotenv.config();

import { checkHash } from '../../../../utils/password';

const request = testClient(signUpHandler);
const prisma = new PrismaClient();


beforeAll(async () => {
  await prisma.$connect();
})

afterAll(async () => {
  await prisma.$disconnect();
})

describe('Success test', () => {
  let email: string = faker.internet.email();
  let password: string = faker.internet.password();

  it('Create user successs', async () => {
    const userData = {
      email: email,
      password: password,
    };
    await request.post('/api/auth/signup').send(userData).expect(201);

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toBeNull();
    expect(user.password).not.toBe(password);
    expect(user.password).toBeDefined();
    expect(checkHash(password, user.password)).toBe(true);
  })
});