export interface IUser {
  id: string;
  email: string;
  username: string;
}

export class User implements IUser {
  public id: string;
  public email: string;
  public username: string;
  public createdAt: Date = new Date();

  constructor({ id, email, username }: IUser) {
    this.id = id;
    this.email = email;
    this.username = username;
  }
}
