'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      onUpdate: 'CASCADE', //daqui pra baixo aonde alterar altera no relacionamento tambem.
      onDelete: 'SET NULL',
      allowNull: true
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('products', 'category_id');
  }
};
