import { UserAttributes } from './users';

export * from './users';
export * from './reaction';
export * from './blogs';
export * from './comments';

export interface Credential {
  username: UserAttributes['email'];
  password: UserAttributes['passwordHash'];
}

export type NewUserParams = Pick<UserAttributes, 'email' | 'name' | 'role'> & {
  password: UserAttributes['passwordHash'];
};

export interface AllQueryParams {
  page: number;
  columnName: string;
  columnValue: string;
  orderBy: string;
  orderDir: string;
}

export interface IdParams {
  id: string;
}
