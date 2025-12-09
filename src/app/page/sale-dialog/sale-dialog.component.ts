import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PaymentService } from "src/app/service/payment.service";
import { PaymentDTO } from "../../domain/dto/payment.dto";

@Component({
    selector: "app-example-dialog",
    templateUrl: "sale-dialog.component.html",
})
export class SaleDialogComponent {
    payments: PaymentDTO[] = [];
    troco = 0.0;

    constructor(
        public dialogRef: MatDialogRef<SaleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private paymentService: PaymentService
    ) {
        this.data.pago = 0;
        this.data.payment = null;
        this.data.installments = 1;
        this.calc();
    }

    onCancel(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.listPayment();
    }

    listPayment() {
        this.paymentService.findAll().subscribe((response) => {
            this.payments = response;
        });
    }
    calc() {
        this.troco = this.data.pago - this.data.pagar;
        this.data.troco = String(this.troco.toFixed(2));
    }
}
