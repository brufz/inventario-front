import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDTO } from '../models/produc-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editProductForm: FormGroup | undefined;
  productId: number | undefined;
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.yCdPVMPz5eIv_oZ4Js08DhLE4BoOuuXLOnKm6YIsN6A";
  message: string = '';
  isError: boolean = false;


  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      id: [''],
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0, Validators.required],
      quantidade: [0, Validators.required]
    });
  }

  loadProductData(): void {
    const productId = this.editProductForm?.get('id')?.value;
    if (productId) {
      this.productService.getProductById(productId, this.token).subscribe({
        next: (product) => {
          this.editProductForm?.patchValue({
            nome: product.nome,
            descricao: product.descricao,
            categoria: product.categoria,
            preco: product.preco,
            quantidade: product.quantidade
          });
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
  


  editProductById(): void {
    const productId = this.editProductForm?.get('id')?.value;
    if(this.editProductForm && this.editProductForm.valid && productId){
      this.productService.editProductById(productId, this.editProductForm.value, this.token)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.message = 'Produto atualizado com sucesso';
          this.isError = false;
          setTimeout(() => {this.message = '';}, 3000);

          if(this.editProductForm){
            this.editProductForm?.reset();
          }
        },
        error: (error) => {
          console.log(error);
          this.message = 'Erro ao atualizar produto';
          this.isError = true;
          setTimeout(() => {this.message = '';}, 3000);
        }
      });
  } else{
    this.message = 'Verifique os dados do formulário';
    this.isError = true;
    setTimeout(() => {this.message = '';}, 3000);

  }
  }
}
