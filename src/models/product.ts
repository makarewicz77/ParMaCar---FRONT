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
  VAT: number;
  producer: string;
  specifactions: Detail[];
  image: string;
  constructor(obj: Product) {
    this.id = obj.id;
    this.name = obj.name;
    this.category_id = obj.category_id;
    this.price = obj.price;
    this.description = obj.description;
    this.quantity = obj.quantity
    this.net = obj.net;
    this.gross = obj.gross;
    this.VAT = obj.VAT;
    this.producer = obj.producer;
    this.specifactions = obj.specifactions;
    this.image = obj.image;
  }
}
