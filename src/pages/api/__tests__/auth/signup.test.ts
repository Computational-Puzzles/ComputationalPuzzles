/**
 * @jest-environment node
 */

import request from 'supertest';
import * as faker from 'faker';
import { prismaMock as app } from '../singleton';

describe('Success test', () => {
  let email: string;
  let password: string;

  beforeEach(async () => {
    await app.$connect();
    email = faker.internet.email();
    password = faker.internet.password();
  })

  afterEach(async () => {
    await app.$disconnect();
  })


  it('Create user successs', () => {
    const userData = {
      email: email,
      password: password,
    };

    request(app).post('/api/auth/signup').send(userData).expect(201);

  })
})

export { }