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


  constructor(private productService: ProductService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.editProductForm = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      preco: [0, Validators.required],
      quantidade: [0, Validators.required]
    });
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    if(this.productId){
      this.productService.getProductById(this.productId, this.token)
        .subscribe({
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
        })
    }
  }

  

  editProductById(): void {
    if(this.editProductForm && this.editProductForm.valid && this.productId){
      this.productService.editProductById(this.productId, this.editProductForm.value, this.token)
      .subscribe({
        next: (response) => {
          console.log(response);
          if(this.editProductForm){
            this.editProductForm.reset();
          }
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
  }
}
