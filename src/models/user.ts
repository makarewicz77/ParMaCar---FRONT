export class User {
  id: number;
  name?: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
  group: string;
  constructor(obj: User) {
    this.id = obj.id;
    this.name = obj.name;
    this.first_name = obj.first_name;
    this.last_name = obj.last_name;
    this.email = obj.email;
    this.username = obj.username;
    this.password = obj.password;
    this.group = obj.group;
  }
}

export class Mechanic{
  id: number;
  user: User;
  avatar: string;
  hourly_rate: string;
  street: string;
  postal_code: string;
  city: string;
  phone: string;
  constructor(obj:Mechanic){
    this.id = obj.id;
    this.user = obj.user;
    this.avatar = obj.avatar;
    this.hourly_rate = obj.hourly_rate;
    this.city = obj.city;
    this.postal_code = obj.postal_code;
    this.street = obj.street;
    this.phone = obj.phone;
  }
}