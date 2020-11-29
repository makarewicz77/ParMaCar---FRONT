import { Product } from "./product";

export class CartLine{
    id: number;
    cart: number;
    product: number;
    product_name: string;
    product_net: number;
    product_gross : number;
    product_image: string;
    quantity: number;
    constructor(obj: CartLine){
        this.id = obj.id;
        this.cart = obj.cart;
        this.product = obj.product;
        this.quantity = obj.quantity;
        this.product_name = obj.product_name;
        this.product_net = obj.product_net;
        this.product_gross = obj.product_gross;
        this.product_image = obj.product_image;
    }
}

export class Cart{
    id: number;
    line: CartLine[];
    user: number;
    constructor(obj: Cart){
        this.id = obj.id;
        this.line = obj.line;
        this.user = obj.user;
    }
}

