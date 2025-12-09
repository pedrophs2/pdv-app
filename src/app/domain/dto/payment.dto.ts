export class PaymentDTO {
    label: string;
    name: string;

    constructor(name: string, label: string) {
        this.name = name;
        this.label = name;
    }
}
