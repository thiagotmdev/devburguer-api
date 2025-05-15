import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User';

class CategoryController {
    async store(request, response) {
        console.log(request.body);

        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false }); //O abortEarly server para mostrar todos os erros porque o Yup  pega somente um erro e para.
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId); //Desestruturação porque tem que receber uma propriedade admin.

        if (!isAdmin) {
            return response.status(401).json({ error: 'User is not authorized' });
        }

        const {filename: path} = request.file;

        const { name } = request.body;

        const categoryExists = await Category.findOne({
            where: {
                name
            }
        });

        if (categoryExists) {
            return response.status(400).json({ error: 'category already exists' });
        }

        // const category = await Category.create({
        //     name,
        // });

        const { id } = await Category.create({
            name,
            path,
        });

        // return response.status(201).json(category);
        return response.status(201).json({ id, name });
    }

    async update(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false }); //O abortEarly server para mostrar todos os erros porque o Yup  pega somente um erro e para.
        } catch (err) {
            console.error('Erro ao buscar categorias:', err);
            return response.status(400).json({ error: err.errors });
        }

        const { admin: isAdmin } = await User.findByPk(request.userId); //Desestruturação porque tem que receber uma propriedade admin.

        if (!isAdmin) {
            return response.status(401).json({ error: 'User is not authorized' });
        }

        const { id } = request.params;

        const categoryExists = await Category.findByPk(id);

        if (!categoryExists) {
            return response.status(400).json({ message: 'make sure your category ID is corrent' });
        }

        let path;
        if (request.file) {
            path = request.file.filename;
        }

        const { name } = request.body;

        if (name) {
            const categoryNameExists = await Category.findOne({
                where: {
                    name,
                }
            });

            if (categoryNameExists && categoryNameExists.id !== id) {
                return response.status(400).json({ error: 'Category already exists' });
            }
        }

        await Category.update(
            {
                name,
                path,
            },
            {

                where: {
                    id,
                }
            }
        );

        return response.status(200).json();
    }

    async index(request, response) {
        const categories = await Category.findAll();

        return response.json(categories);
    }
}

export default new CategoryController();