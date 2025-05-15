import  Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
            },
        );

        return this; //Para que o sequelize precisa para fazer o mapeamento que precisa.
    }
}

export default Category;