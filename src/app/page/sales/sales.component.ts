import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SaleService } from "src/app/service/sale.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Sale } from "../../domain/model/sale/sale";

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
        "excluir",
    ];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100];
    mensagemErros: String[] = [];

    constructor(
        private saleService: SaleService,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
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

    openDialog(id: number) {
        const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.excluir(id);
            }
        });
    }

    private excluir(id: number) {
        this.saleService.delete(id).subscribe(
            (response) => {
                this.ngOnInit();
                this.mensagemErros = [];

                this.snackBar.open("Venda excluida com sucesso!", "Sucesso", {
                    duration: 2000,
                });
            },
            (errorResponse) => {
                this.mensagemErros = ["Erro: " + errorResponse.error.message];
            }
        );
    }

    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listSales(this.pagina, this.tamanho);
    }
}
