export interface ISignUpUserData {
  name: string;
  login: string;
  password: string;
}

export interface ISignInUserData {
  login: string;
  password: string;
}

export interface IUserData {
  id?: string;
  name?: string;
  login: string;
  password?: string;
}
