import { Sequelize } from "sequelize";
import mongoose from "mongoose";
import configDataBase from '../config/database';
import User from "../app/models/User";
import Product from "../app/models/Product";
import Category from "../app/models/Category";

const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(configDataBase);

        models.forEach((model) => model.init(this.connection));

        models.forEach((model) => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }

    mongo() {
        this.mongoConnection = mongoose.connect(
            'mongodb://localhost:27017/devburguer',
        );
    }
}

export default new Database();