import { DataTypes, Model } from 'sequelize';
import { IImage, IImageInput, ImageType } from '../../types/images';

import { sequelize } from '../index';

class Image extends Model<IImage, IImageInput> implements IImage {
  public imageId!: string;
  public imageType!: ImageType;
  public blogId!: string;
  public userId!: string;
  public name!: string;
  public originalName!: string;
  public fileLocation!: string;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Image.init(
  {
    imageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Blog',
        key: 'blogId',
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId',
      },
    },
    imageType: {
      type: DataTypes.ENUM('blog', 'user'),
      allowNull: false,
      defaultValue: 'blog',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'image',
  }
);

export default Image;
