import  Sequelize, { Model } from "sequelize";

class Category extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                path: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get(){
                        return `http://localhost:3001/category-file/${this.path}`;
                    }
                }
            },
            {
                sequelize,
            },
        );

        return this; //Para que o sequelize precisa para fazer o mapeamento que precisa.
    }
}

export default Category;