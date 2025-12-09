import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductService } from "src/app/service/product.service";
import { ConfirmaDeleteComponent } from "src/app/util/confirma-delete/confirma-delete.component";
import { Product } from "../../domain/model/product/product";
import parseMoney from "parse-money";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-product",
    templateUrl: "./product.component.html",
    styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
    form: FormGroup;
    errorMessages: String[] = [];
    pageTitle = "Cadastro de Produto";
    productId?: number;

    constructor(
        private readonly productService: ProductService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar,
        private readonly dialog: MatDialog,
        private readonly currentRoute: ActivatedRoute,
        private readonly router: Router
    ) {}

    ngOnInit(): void {
        this.montarFormulario();

        this.productId = Number(this.currentRoute.snapshot.paramMap.get("id"));

        if (this.productId) {
            this.pageTitle = "Atualizar Produto";
            this.preencherFormulario(this.productId);
        }
    }

    montarFormulario() {
        this.form = this.formBuilder.group({
            id: [null, Validators.nullValidator],
            barcode: [null, [Validators.minLength(1)]],
            name: [null, [Validators.minLength(3), Validators.maxLength(50)]],
            price: [null, [Validators.minLength(1), Validators.maxLength(6)]],
            stock: [0, [Validators.minLength(1)]],
            active: ["true", Validators.required],
        });
    }

    limparFormulario() {
        this.form.reset();
    }

    submit() {
        const formValues = this.form.value;
        const product: Product = new Product(
            formValues.id,
            formValues.barcode,
            formValues.name,
            parseMoney(formValues.price)?.amount.toFixed(2),
            formValues.stock,
            formValues.active
        );

        if (formValues.id) {
            this.productService.update(product).subscribe(
                (resposta) => {
                    this.snackBar.open(
                        "Produto alterado com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );

                    this.router.navigate(["/product-list"]);
                },
                (errorResponse) => {
                    this.snackBar.open(errorResponse.error.message, "ERRO", {
                        duration: 2000,
                    });
                }
            );
        } else {
            this.productService.save(product).subscribe(
                (resposta) => {
                    this.snackBar.open(
                        "Produto salvo com sucesso!",
                        "Sucesso",
                        {
                            duration: 2000,
                        }
                    );

                    this.router.navigate(["/product-list"]);
                },
                (errorResponse) => {
                    this.snackBar.open(errorResponse.error.message, "ERRO", {
                        duration: 2000,
                    });
                }
            );
        }
    }

    private preencherFormulario(id: number) {
        this.productService.findProductById(id).subscribe((product) => {
            this.form.controls.id.setValue(id);
            this.form.controls.barcode.setValue(product.barcode);
            this.form.controls.name.setValue(product.name);
            this.form.controls.stock.setValue(product.stock);
            this.form.controls.price.setValue(
                (product.price + "").replace(".", ",")
            );
            this.form.controls["active"].setValue(
                product.active ? "true" : "false"
            );
        });
    }
}
