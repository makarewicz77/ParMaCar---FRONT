export class User{
    id:number;
    name?:string;
    username: string;
    email: string;
    password:string;
    constructor(obj: User){
        this.id = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.username = obj.username;
        this.password = obj.password;
    }
}