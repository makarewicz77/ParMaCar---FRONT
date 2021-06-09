export interface Detail {
  id: number;
  key: string;
  value: string;
}

export interface SpecificationLinks {
  link: string;
}

export class Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
  quantity: number;
  net: number;
  producer: string;
  specifications: SpecificationLinks[];
  category_name: string;
  constructor(obj: Product) {
    this.id = obj.id;
    this.name = obj.name;
    this.category_id = obj.category_id;
    this.price = obj.price;
    this.description = obj.description;
    this.quantity = obj.quantity;
    this.net = obj.net;
    this.producer = obj.producer;
    this.specifications = obj.specifications;
    this.category_name = obj.category_name;
  }
}
