export class Category {
  id: number;
  name: string;
  parent_id: number;

  constructor(obj: Category) {
    this.id = obj.id;
    this.name = obj.name;
    this.parent_id = obj.parent_id;
  }
}
