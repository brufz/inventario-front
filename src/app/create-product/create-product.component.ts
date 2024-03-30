import { ProductService } from '../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup | undefined;
  message: string = '';
  isError: boolean = false;

  constructor(private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0, [Validators.required, Validators.min(0.01)]],
      quantidade: [0, [Validators.required, Validators.min(1)]]
    });
  }
  
    createProduct(): void {
      if (this.form && this.form.valid) {
        this.productService.createProduct(this.form.value, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.yCdPVMPz5eIv_oZ4Js08DhLE4BoOuuXLOnKm6YIsN6A")
          .subscribe((response) => {
            console.log(response);
            this.message = 'Produto criado com sucesso!';
            this.isError = false;
            setTimeout(() => {this.message = '';}, 3000);
            if (this.form) {
              this.form.reset();
            }
          },
          (error) => { 
            console.log(error);
            this.message = 'Erro ao criar produto!'
            this.isError = true;
          }
          );
      }
    }
}
