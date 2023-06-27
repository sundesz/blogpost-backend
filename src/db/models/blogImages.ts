import { DataTypes, Model } from 'sequelize';
import {
  BlogImageAttributes,
  BlogInputAttributes,
} from '../../types/blogImages';
import { sequelize } from '../index';

class BlogImage
  extends Model<BlogImageAttributes, BlogInputAttributes>
  implements BlogImageAttributes
{
  public blogImageId!: string;
  public blogId!: string;
  public imageId!: string;
  public passive!: boolean;
}

BlogImage.init(
  {
    blogImageId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    blogId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Blog',
        key: 'blogId',
      },
    },
    imageId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Image',
        key: 'imageId',
      },
    },
    passive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'BlogImage',
  }
);

export default BlogImage;
