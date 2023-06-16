import { UserRoleType } from './users';

export interface ISession {
  sid: string;
  userId?: string;
  isValid: boolean;
  data?: string;
  expires?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SessionInputType = Omit<ISession, 'sid'>;

export interface ISessionData {
  name: string;
  email: string;
  userId: string;
  role: UserRoleType;
}
