class Detail{
    key: string;
    value: string;
    constructor(obj:Detail){
        this.key = obj.key;
        this.value = obj.value;
    }
}

export class Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
  quantity: number;
  net: number;
  gross: number;
  vat: number;
  producer: string;
  specifications: Detail[];
  image: string;
  warranty: string;
  category_name: string;
  constructor(obj: Product) {
    this.id = obj.id;
    this.name = obj.name;
    this.category_id = obj.category_id;
    this.price = obj.price;
    this.description = obj.description;
    this.quantity = obj.quantity;
    this.net = obj.net;
    this.gross = obj.gross;
    this.vat = obj.vat;
    this.producer = obj.producer;
    this.specifications = obj.specifications;
    this.image = obj.image;
    this.warranty = obj.warranty;
    this.category_name = obj.category_name;
  }
}
