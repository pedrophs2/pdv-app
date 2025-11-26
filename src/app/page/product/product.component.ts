import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/service/product.service';
import { ConfirmaDeleteComponent } from 'src/app/util/confirma-delete/confirma-delete.component';
import { Product } from './product';
import parseMoney from 'parse-money';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  formulario: FormGroup;
  mensagemErros: String[] = [];
  tituloPagina = "Cadastro de Produto"
  idProduto?: number

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public currentRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.montarFormulario();
    
    this.idProduto = Number(this.currentRoute.snapshot.paramMap.get('id'))

    if(this.idProduto){
      this.tituloPagina = "Atualizar Produto"
      this.preencherFormulario(this.idProduto)
    }
  }

  montarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [null, Validators.nullValidator],
      barcode: [null, [Validators.minLength(1)]],
      name: [null, [Validators.minLength(3), Validators.maxLength(50)]],
      price: [null, [Validators.minLength(1), Validators.maxLength(6)]],
      active: ['true', Validators.required],
    })
  }

  limparFormulario() {
    this.formulario.reset();
  }

  submit() {
    const formValues = this.formulario.value;
    const product: Product = new Product(
      formValues.id,
      formValues.barcode,
      formValues.name,
      parseMoney(formValues.price)?.amount.toFixed(2),
      formValues.active);

    if (formValues.id) {
      this.productService.update(product).subscribe(resposta => {
        this.snackBar.open('Produto alterado com sucesso!', 'Sucesso', {
          duration: 2000
        })

        this.router.navigate(['/product-list'])
      }, errorResponse => {
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
    } else {
      this.productService.save(product).subscribe(resposta => {
        this.snackBar.open('Produto salvo com sucesso!', 'Sucesso', {
          duration: 2000
        })

        this.router.navigate(['/product-list'])
      }, errorResponse => {
        this.snackBar.open(errorResponse.error.message, 'ERRO', {
          duration: 2000
        })
      })
    }
  }

  private preencherFormulario(id: number) {
    this.productService.findProductById(id).subscribe((response) => {
      this.formulario.controls.id.setValue(id);
      this.formulario.controls.barcode.setValue(response.barcode)
      this.formulario.controls.name.setValue(response.name);
      this.formulario.controls.price.setValue((response.price+"").replace(".",","));
      this.formulario.controls['active'].setValue(response.active?'true':'false');
    })
  }
}