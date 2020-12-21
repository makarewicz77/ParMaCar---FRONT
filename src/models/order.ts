import { Cart } from "./cart";

export class Order{
    id: number;
    status: string;
    date: string;
    note: string;
    user: number;
    mechanic: number;
    cart: Cart | number;
    constructor(obj: Order){
        this.id = obj.id;
        this.status = obj.status;
        this.date = obj.date;
        this.note = obj.note;
        this.user = obj.user;
        this.mechanic = obj.mechanic;
        this.cart = obj.cart;
    }
}

export enum ORDER_STATUS{
    NEW = 'New'
}