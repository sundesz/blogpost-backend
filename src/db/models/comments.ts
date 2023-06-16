import { DataTypes, Model } from 'sequelize';
import { IComment, ICommentInput } from '../../types/comments';
import { sequelize } from '../index';

class Comment extends Model<IComment, ICommentInput> implements IComment {
  public commentId!: string;
  public blogId!: string;
  public userId!: string | null;
  public parentId!: string;
  public title!: string;
  public content!: string;
  public published!: boolean;
  public passive!: boolean;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Comment.init(
  {
    commentId: {
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
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'userId',
      },
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    passive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'comment',
  }
);

export default Comment;
