import {AuthUser} from './user';

export interface UserPage {
  users: AuthUser[];
  lastVisible: string;
  firstVisible: string;
}
