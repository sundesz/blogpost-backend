import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';
import { IUser, IUserInput, UserRoleType } from '../../types/users';

class User extends Model<IUser, IUserInput> implements IUser {
  public userId!: string;
  public email!: string;
  public name!: string;
  public passwordHash!: string;
  public isActive!: boolean;
  public role!: UserRoleType;

  public readonly createdAt!: string;
  public readonly updateAt!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'author', 'user'),
      defaultValue: 'user',
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  }
);

export default User;
