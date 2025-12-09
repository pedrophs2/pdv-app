import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SaleService } from "src/app/service/sale.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Sale } from "../../domain/model/sale/sale";
import { Router } from "@angular/router";

@Component({
    selector: "app-sales",
    templateUrl: "./sales.component.html",
    styleUrls: ["./sales.component.scss"],
})
export class SalesComponent implements OnInit {
    sales: Sale[] = [];

    ordemColunasTabela = [
        "id",
        "amount",
        "amountPaid",
        "difference",
        "payment",
        "installments",
        "employee",
    ];

    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100];
    mensagemErros: String[] = [];

    constructor(
        private readonly saleService: SaleService,
        private readonly snackBar: MatSnackBar,
        private readonly dialog: MatDialog,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.listSales(this.pagina, this.tamanho);
    }

    listSales(pagina: number, tamanho: number) {
        this.saleService.list(pagina, tamanho).subscribe((response) => {
            this.sales = response.content;
            this.totalElementos = response.totalElements;
            this.pagina = response.number;
        });
    }

    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listSales(this.pagina, this.tamanho);
    }

    edit(sale: any) {
        alert("Em desenvolvimento");
    }
}
