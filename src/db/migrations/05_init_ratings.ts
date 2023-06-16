import { DataTypes } from 'sequelize';
import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('ratings', {
    rating_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    comment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'comments', key: 'comment_id' },
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('ratings');
};
