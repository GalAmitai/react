export class IProduct {
    id: string;
    name: string;
    description: string;
    image: string;
    price: number;
    rate: number;

    constructor(obj: IProduct) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.image = obj.image;
        this.price = obj.price;
        this.rate = obj.rate;
    }
}