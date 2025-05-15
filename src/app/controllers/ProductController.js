import * as Yup from 'yup';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';

class ProductController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false }); //O abortEarly server para mostrar todos os erros porque o Yup  pega somente um erro e para.
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId); //Desestruturação porque tem que receber uma propriedade admin.

        if (!isAdmin) {
            return response.status(401).json({ error: 'User is not authorized' });
        }

        const { filename: path } = request.file;
        const { name, price, category_id, offer } = request.body;

        const product = await Product.create({
            name,
            price,
            category_id,
            path,
            offer,
        });

        return response.status(201).json({ product });
    }

     async update(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            price: Yup.number().required(),
            category_id: Yup.number().required(),
            offer: Yup.boolean(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false }); //O abortEarly server para mostrar todos os erros porque o Yup  pega somente um erro e para.
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId); //Desestruturação porque tem que receber uma propriedade admin.

        if (!isAdmin) {
            return response.status(401).json({ error: 'User is not authorized' });
        }

        const { id } = request.params;
        const findProduct = await Product.findByPk(id);

        if(!findProduct){
            return response
            .status(400)
            .json({eror: 'Make sure your product ID is correct'});
        }

        let path;
        if(request.file){
            path = request.file.filename;
        }

        //const { filename: path } = request.file;
        const { name, price, category_id, offer } = request.body;

        await Product.update({
            name,
            price,
            category_id,
            path,
            offer,
        },{
            where: {
                id
            }
        });

        return response.status(200).json();
    }

    async index(request, response) {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }
        });

        //console.log({userId: request.userId});

        return response.json(products);
    }
}

export default new ProductController();