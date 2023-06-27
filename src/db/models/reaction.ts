import { DataTypes, Model } from 'sequelize';
import {
  ReactionAttributes,
  ReactionInputAttributes,
  ReactionType,
} from '../../types/reaction';
import { sequelize } from '../index';

class Reaction
  extends Model<ReactionAttributes, ReactionInputAttributes>
  implements ReactionAttributes
{
  public reactionId!: string;
  public reactionType!: ReactionType;
  public blogId!: string;
  public userId!: string | null;
  public passive!: boolean;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Reaction.init(
  {
    reactionId: {
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
    reactionType: {
      type: DataTypes.ENUM('thumbsUp', 'wow', 'heart'),
      allowNull: false,
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
    freezeTableName: true,
    modelName: 'Reaction',
  }
);

export default Reaction;
