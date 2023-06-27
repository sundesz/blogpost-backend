import { Model, DataTypes } from 'sequelize';
import { SessionAttributes, SessionInputAttributes } from '../../types/session';
import { sequelize } from '../index';

class Session
  extends Model<SessionAttributes, SessionInputAttributes>
  implements SessionAttributes
{
  public sid!: string;
  public userId!: string;
  public isValid!: boolean;
  public data!: string;
  public expires!: string;
  public token!: string;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Session.init(
  {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: { model: 'User', key: 'userId' },
    },
    isValid: {
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
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    freezeTableName: true,
    tableName: 'session',
    // modelName: 'session', // modelName doesn't work
    defaultScope: {
      where: {
        isValid: true,
      },
    },
  }
);

export default Session;
