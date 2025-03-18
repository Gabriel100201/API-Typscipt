// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { User } from '../validators/user.validator';

const prisma = new PrismaClient();

export const getUsers = async (): Promise<User[]> => {
  return prisma.user.findMany();
};

export const createUser = async (user: User): Promise<User> => {
  const { name, email } = user;
  return prisma.user.create({
    data: { name, email },
  });
};
