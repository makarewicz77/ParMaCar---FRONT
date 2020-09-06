export class VCategory {
    id: number;
    name: string;
    parent_id: number | null;

    constructor(obj:VCategory) {
        this.id = obj.id;
        this.name = obj.name;
        this.parent_id = obj.parent_id;
    }
}


