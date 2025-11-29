export class Product {
    id: number;
    barcode: string;
    name: string;
    price: any;
    stock: number;
    active: any;

    constructor(
        id: number,
        barcode: string,
        name: string,
        price: any,
        stock: number,
        active: any
    ) {
        this.id = id;
        this.barcode = barcode;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.active = active;
    }
}
