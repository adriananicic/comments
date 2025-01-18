import { getUserReturn, listUsersReturn } from '../../types/list-return';

export interface UserDbActions {
  listUsers(): Promise<listUsersReturn>;
}
