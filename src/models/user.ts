export class User {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
  constructor(obj: User) {
    this.id = obj.id;
    this.name = obj.name;
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.email = obj.email;
    this.username = obj.username;
    this.password = obj.password;
  }
}
