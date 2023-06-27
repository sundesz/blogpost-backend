import { DataTypes, Model } from 'sequelize';
import { ImageAttributes, ImageInputAttributes } from '../../types/images';

import { sequelize } from '../index';

class Image
  extends Model<ImageAttributes, ImageInputAttributes>
  implements ImageAttributes
{
  public imageId!: string;
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
    modelName: 'Image',
  }
);

export default Image;
