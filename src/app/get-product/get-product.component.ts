import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../models/produc-dto';


@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit {
  id: number | undefined;
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.yCdPVMPz5eIv_oZ4Js08DhLE4BoOuuXLOnKm6YIsN6A";
  product: ProductDTO = {nome: '', descricao: '', preco: 0, quantidade: 0, categoria: ''}
  products: ProductDTO[] = [];
  categoria = this.product.categoria;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  getProductById() : void {
    if(this.id){
      this.productService.getProductById(this.id, this.token)
        .subscribe((response) => {
          this.product = response;
        },
        (error) => { console.log(error); }
        );
    }
  }



  getProductByCategory() : void {
    
    if(this.categoria){
      this.productService.getProductByCategory(this.categoria, this.token)
        .subscribe((response) => {
          this.products = response;
          console.log(response)
        },
        (error) => { console.log(error); }
        );
    }
  }

  clear() : void {
    this.product = {nome: '', descricao: '', preco: 0, quantidade: 0, categoria: ''};
    this.id = undefined;
  }

  clearAll() : void {
    this.products = [];
    this.categoria = this.product.categoria;
  }
}
