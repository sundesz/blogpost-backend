import { IUser } from './users';

export * from './users';
export * from './reaction';
export * from './blogs';

export interface IPassword {
  password: IUser['passwordHash'];
}

export type CredentialType = { username: IUser['email'] } & IPassword;

export type NewUserInputType = Pick<IUser, 'email' | 'name' | 'role'> &
  IPassword;
