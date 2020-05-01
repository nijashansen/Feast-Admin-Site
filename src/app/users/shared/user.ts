


export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  userRecipes?: Map<string, string>;
}
