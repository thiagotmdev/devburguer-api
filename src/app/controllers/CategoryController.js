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
        });

        // return response.status(201).json(category);
        return response.status(201).json({ id, name });
    }

    async index(request, response) {
        const categories = await Category.findAll();

        return response.json(categories);
    }
}

export default new CategoryController();