// const { Router } = require('express')
import {Router} from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// import User from './app/models/user';
// import { v4 } from 'uuid';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ProductController from './app/controllers/ProductController';
import authMiddleware from './app/middlewares/auth';
import CategoryController from './app/controllers/CategoryController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();
const userController = new UserController();
const upload = multer(multerConfig);

// routes.get('/', async(request, response) => {
//     // return response.status(200).json({ message: 'Hello world'})

//     const user = await User.create({
//         id: v4(),
//         name: 'Thiago',
//         email: 'thiagomendes.dev@gmail.com',
//         password_hash: 'uwerjer25sdasd47dsa'
//     });

//     return response.status(201).json(user);
// });

// routes.post('/users', (request, response) => userController.store(request, response));
routes.post('/users',  userController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware); //O que estiver abaixo desse middleware vai pegar ele.

routes.post('/products', upload.single('file'),ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);

routes.post('/categories', CategoryController.store);
routes.get('/categories', CategoryController.index);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);

// module.exports = routes
export default routes;


//request => middleware => controller => model => database => response