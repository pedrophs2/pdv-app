import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/service/product.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Product } from "../../domain/model/product/product";
import { Router } from "@angular/router";

@Component({
    selector: "app-products",
    templateUrl: "./products.component.html",
    styleUrls: ["./procucts.component.scss"],
})
export class ProductsComponent implements OnInit {
    formulario: FormGroup;

    products: Product[] = [];

    ordemColunasTabela = ["id", "name", "price", "stock"];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100];
    mensagemErros: String[] = [];

    constructor(
        private readonly productService: ProductService,
        private readonly snackBar: MatSnackBar,
        private readonly dialog: MatDialog,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.listProducts(this.pagina, this.tamanho);
    }

    listProducts(pagina: number, tamanho: number) {
        this.productService.list(pagina, tamanho).subscribe((response) => {
            this.products = response.content;
            this.totalElementos = response.totalElements;
            this.pagina = response.number;
        });
    }

    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listProducts(this.pagina, this.tamanho);
    }

    edit(product: any) {
        this.router.navigate([`products/${product.id}`]);
    }
}
