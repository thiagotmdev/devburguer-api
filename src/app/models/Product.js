import Sequelize, { Model } from "sequelize";

class Product extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                price: Sequelize.INTEGER,
                path: Sequelize.STRING,
                offer: Sequelize.BOOLEAN,
                url: { //Aqui isso vai funcionar para mostrar no navegador a imagem do produto.
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3001/product-file/${this.path}`;
                    },
                },
            },
            {
                sequelize,
            },
        );

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        });
    }
}

export default Product;