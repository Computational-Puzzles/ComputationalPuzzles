/**
 * @jest-environment node
 */
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import adminValidate from '../../../../pages/api/admin/validate';
import { mockEmail, mockPassword } from '../../../../__mocks__/pages/api/auth';

const prisma = new PrismaClient();

beforeEach(async () => {
  await prisma.user.deleteMany();
  await prisma.account.deleteMany();
})

describe('The user is the real admin', () => {
  let adminEmail;
  beforeEach(async () => {
    adminEmail = mockEmail();

    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        password: mockPassword()
      }
    });

    await prisma.account.create({
      data: {
        userId: adminUser.id,
        type: 'admin',
        provider: '',
        providerAccountId: '',
      }
    });
  });

  it('Sucessfully validate admin', async () => {
    const req = {
      body: {
        email: adminEmail
      }
    } as unknown as NextApiRequest;

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
  })
});

export { };
