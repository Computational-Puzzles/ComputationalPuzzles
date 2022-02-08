/**
 * @jest-environment node
 */
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import adminValidate from '../../../../pages/api/admin/validate';
import { mockEmail, mockPassword } from '../../../../__mocks__/pages/api/auth';

const prisma = new PrismaClient();
const { createUser } = PrismaAdapter(prisma);


beforeEach(async () => {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
});

describe('/api/admin/validate: Success', () => {

  const adminEmail = mockEmail();

  it('Sucessfully validate admin', async () => {
    const adminUser = await createUser({
      email: adminEmail,
      password: mockPassword()
    });

    await prisma.account.create({
      data: {
        userId: parseInt(adminUser.id),
        type: 'admin',
        provider: '',
        providerAccountId: adminEmail,
      }
    });

    const req = {
      body: {
        email: adminEmail
      }
    } as NextApiRequest;

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json }
    });
    const res = {
      status
    } as unknown as NextApiResponse;


    await adminValidate(req, res);

    expect(json.mock.calls[0][0]).toMatchObject({
      email: adminEmail,
      password: expect.any(String)
    });
    expect(status.mock.calls[0]).toEqual([200]);
  });


  const userEmail = mockEmail();

  it('Successfully reject non-admin users', async () => {
    const normalUser = await createUser({
      email: userEmail,
      password: mockPassword()
    });

    await prisma.account.create({
      data: {
        userId: parseInt(normalUser.id),
        type: 'user',
        provider: '',
        providerAccountId: userEmail,
      }
    });

    const req = {
      body: {
        email: userEmail
      }
    } as NextApiRequest;

    const json = jest.fn();
    const status = jest.fn(() => {
      return { json }
    });
    const res = {
      status
    } as unknown as NextApiResponse;

    await adminValidate(req, res);

    // expect(json.mock.calls[0][0]).toMatchObject({
    //   email: userEmail,
    //   password: expect.any(String)
    // });
    // console.log(json.mock.calls[0])
    expect(status.mock.calls[0]).toEqual([403]);
  })
});

describe('/api/admin/validate: Missing parameters for API', () => {

})
