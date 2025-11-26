export class Product {
    id: number;
    barcode: string;
    name: string;
    price: any;
    active: any;

    constructor(id: number, barcode: string, name: string, price: any, active: any) {
        this.id = id;
        this.barcode = barcode;
        this.name = name;
        this.price = price;
        this.active = active;
    }
}