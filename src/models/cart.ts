import { Product } from "./product";

export class CartLine {
  id: number;
  cart: number;
  product: number;
  product_name: string;
  product_net: number;
  quantity: number;
  available_quantity: number;
  constructor(obj: CartLine) {
    this.id = obj.id;
    this.cart = obj.cart;
    this.product = obj.product;
    this.quantity = obj.quantity;
    this.product_name = obj.product_name;
    this.product_net = obj.product_net;
    this.available_quantity = obj.available_quantity;
  }
}

export class Cart {
  id: number;
  line: CartLine[];
  user: number;
  sum_net: number;
  constructor(obj: Cart) {
    this.id = obj.id;
    this.line = obj.line;
    this.user = obj.user;
    this.sum_net = obj.sum_net;
  }
}
