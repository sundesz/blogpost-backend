export type UserRoleType = 'admin' | 'author' | 'user';

// defines all the possible attributes of our model
export interface UserAttributes {
  userId: string;
  email: string;
  name: string;
  passwordHash: string;
  isActive: boolean;
  role: UserRoleType;
  imageId: string | null;
  createdAt?: string;
  updateAt?: string;
}

// defines the type of the object passed to Sequelize’s model.create
export type UserInputAttributes = UserAttributes;
// export type UserInputAttributes = Omit<UserAttributes, 'userId'>;
