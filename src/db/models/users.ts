import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../index';
import {
  UserAttributes,
  UserInputAttributes,
  UserRoleType,
} from '../../types/users';

class User
  extends Model<UserAttributes, UserInputAttributes>
  implements UserAttributes
{
  public userId!: string;
  public email!: string;
  public name!: string;
  public passwordHash!: string;
  public imageId!: string | null;
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
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Image',
        key: 'imageId',
      },
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
    modelName: 'User',
  }
);

export default User;
