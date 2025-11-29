import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/service/product.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Product } from "../product/product";

@Component({
    selector: "app-product-list",
    templateUrl: "./product-list.html",
    styleUrls: ["./product-list.css"],
})
export class ProductList implements OnInit {
    formulario: FormGroup;
    //lista de products para exiboir
    products: Product[] = [];
    //ordem das colunas no html
    ordemColunasTabela = [
        "id",
        "name",
        "price",
        "stock",
        "active",
        "excluir",
        "editar",
    ];
    totalElementos = 0;
    pagina = 0;
    tamanho = 5;
    pageSizeOptions: number[] = [5, 10, 15, 100]; // [10,20,30] quantidade de item por página
    mensagemErros: String[] = []; //array de strings dos erros retornados do backend

    constructor(
        private productService: ProductService,
        private formBuilder: FormBuilder,
        private snackBar: MatSnackBar,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.listarProductes(this.pagina, this.tamanho);
    }

    listarProductes(pagina: number, tamanho: number) {
        // definir a primeira página e o tamanho inicial
        this.productService.list(pagina, tamanho).subscribe((response) => {
            this.products = response.content; // pegar o conteudo do pag
            this.totalElementos = response.totalElements; // pegar o total de elementos
            this.pagina = response.number; // pegar o numero de paginas
        });
    }

    private excluir(id: number) {
        this.productService.delete(id).subscribe(
            (response) => {
                this.ngOnInit();
                this.mensagemErros = [];
                // exibir mensagem snackbar
                this.snackBar.open(
                    "Producto excluido com sucesso!",
                    "Sucesso",
                    {
                        duration: 2000,
                    }
                );
            },
            (errorResponse) => {
                // exibe mensagem de erro da api
                this.mensagemErros = ["Erro: " + errorResponse.error.message];
            }
        );
    }

    editar(id: number) {
        this.productService.findProductById(id).subscribe((response) => {
            // cria e adiciona no objeto
            this.formulario.controls.id.setValue(id);
            this.formulario.controls.name.setValue(response.name);
            this.formulario.controls.price.setValue(
                (response.price + "").replace(".", ",")
            );
            this.formulario.controls["active"].setValue(
                response.active ? "true" : "false"
            );
        });
    }

    //chamar a paginação
    paginar(event: PageEvent) {
        this.pagina = event.pageIndex;
        this.tamanho = event.pageSize;
        this.listarProductes(this.pagina, this.tamanho);
    }

    openDialog(id: number) {
        const dialogRef = this.dialog.open(ConfirmaDeleteComponent);
        dialogRef.afterClosed().subscribe((result) => {
            // se clicar em ok chama evento de excluir
            if (result) {
                this.excluir(id);
            }
        });
    }
}
