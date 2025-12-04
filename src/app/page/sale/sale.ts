import { UserDTO } from "src/app/domain/dto/user/user.dto";

export class Sale {
    id: any;
    amount: any;
    amountPaid: any;
    difference: any;
    payment: any;
    installments: number;
    products: any;
    employee: UserDTO;

    constructor(
        id: any,
        amount: any,
        amountPaid: any,
        difference: any,
        payment: any,
        installments: number,
        products: any,
        employee: UserDTO
    ) {
        this.id = id;
        this.amount = amount;
        this.amountPaid = amountPaid;
        this.difference = difference;
        this.payment = payment;
        this.installments = installments;
        this.products = products;
        this.employee = employee;
    }
}
