import { DataTypes } from 'sequelize';
import { Migration } from '..';

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.createTable('session', {
    sid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: { model: 'users', key: 'user_id' },
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    data: {
      type: DataTypes.TEXT,
    },
    expires: {
      type: DataTypes.DATE,
    },
    token: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.TIME,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('session');
};
