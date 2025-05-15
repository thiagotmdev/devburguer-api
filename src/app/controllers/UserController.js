import { v4 } from "uuid";
import User from "../models/User";
import * as Yup from 'yup';

class UserController {

    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean()
        });

        try {
            schema.validateSync(request.body, { abortEarly: false }); //O abortEarly server para mostrar todos os erros porque o Yup  pega somente um erro e para.
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name, email, password, admin } = request.body;

        const userExists = await User.findOne({
            where: {
                email
            }
        });

        if (userExists) {
            return response.status(400).json({ Error: 'User already exists' });
        }

        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
        });

        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin
        });
    }
}

export default UserController;