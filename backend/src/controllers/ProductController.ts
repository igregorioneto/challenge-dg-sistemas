import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Product from '../models/Product';


class ProductController {

    async getAllProducts(req: Request, res: Response) {
        try {
            const repository = getRepository(Product);
            const persons = await repository.find();
            return res.json(persons);
        } catch(error) {
            return res.json({
                error,
            });
        }
    }

    async getByIdProduct(req: Request, res: Response) {
        try {
            const repository = getRepository(Product);
            const { id } = req.params;

            const person = await repository.findOne({
                where: { id }
            });

            return res.json(person);
        } catch(error) {
            return res.json({
                error,
            });
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            const repository = getRepository(Product);
            const { name, price } = req.body;

            const prof = await repository.create({ name, price });
            await repository.save(prof);

            return res.json(prof);
        } catch(error) {
            return res.json({
                error,
            });
        }
    }

    async updateProduct(req: Request, res: Response) {
        try {
            const repository = getRepository(Product);
            const { name, price } = req.body;
            const { id } = req.params;

            const product = await repository.findOne({
                where: { id }
            });

            product!.name = name;
            product!.price = price;

            await repository.save(product!);

            return res.json({ message: 'Product successfully deleted!' });
        } catch(error) {
            return res.json({
                error,
            });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const repository = getRepository(Product);
            const { id } = req.params;

            const product = await repository.findOne({
                where: { id }
            });

            await repository.delete({ id: product?.id });

            return res.json(product);
        } catch(error) {
            return res.json({
                error,
            });
        }
    }

}

export default new ProductController();