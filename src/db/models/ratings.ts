import { DataTypes, Model } from 'sequelize';
import { IRating, IRatingInput } from '../../types/ratings';
import { sequelize } from '../index';

class Rating extends Model<IRating, IRatingInput> implements IRating {
  public ratingId!: string;
  public commentId!: string;
  public rating!: number;
}

Rating.init(
  {
    ratingId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Comment',
        key: 'commentId',
      },
    },
    rating: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'rating',
  }
);

export default Rating;
