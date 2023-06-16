export type UserRoleType = 'admin' | 'author' | 'user';

// defines all the possible attributes of our model
export interface IUser {
  userId: string;
  email: string;
  name: string;
  passwordHash: string;
  isActive: boolean;
  role: UserRoleType;
  createdAt?: string;
  updateAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type IUserInput = Omit<IUser, 'userId'>;
