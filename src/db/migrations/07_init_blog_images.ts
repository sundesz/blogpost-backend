import { DataTypes } from 'sequelize';
import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('blog_images', {
    blog_image_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blog_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'blogs', key: 'blog_id' },
    },
    image_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: 'images', key: 'image_id' },
    },
    passive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('blog_images');
};
