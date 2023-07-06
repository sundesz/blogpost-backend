import { UserRoleType } from './users';

export interface SessionAttributes {
  sid: string;
  userId?: string;
  isValid: boolean;
  data?: string;
  expires?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SessionInputAttributes = Omit<SessionAttributes, 'sid'>;

export interface SessionDataAttributes {
  name: string;
  email: string;
  userId: string;
  role: UserRoleType;
  profilePic: string | null;
}
