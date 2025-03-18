import { Request, Response } from 'express';
import { createProduct, getProducts } from '../service/product.service';
import { productSchema, Product } from '../validators/product.validator';

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await getProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo productos' });
  }
};

export const addProduct = async (req: Request<{}, {}, Product>, res: Response) => {
  try {
    const validatedData = productSchema.parse(req.body);

    const newProduct = await createProduct({ id: validatedData.id, name: validatedData.name, price: validatedData.price });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: 'Datos inválidos', error });
  }
};