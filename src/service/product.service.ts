// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaClient } from '@prisma/client';
import { productSchema, Product } from '../validators/product.validator';

const prisma = new PrismaClient();

export const getProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany();
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { name, price } = product;
  const validateProduct = productSchema.parse({ name, price });
  return prisma.product.create({
    data: validateProduct,
  });
};