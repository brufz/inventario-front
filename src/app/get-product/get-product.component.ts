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
  showIdInput: boolean = false;
  showCategoryInput: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0; 

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  getProductById() : void {
    this.clearAll();
    if(this.id){
      this.productService.getProductById(this.id, this.token)
        .subscribe((response) => {
          this.product = response;
        },
        (error) => { console.log(error); }
        );
    }
  }



  getProductByCategory(page: number, size:number) : void {
    this.clear();
    if(this.categoria){
      this.productService.getProductByCategory(this.categoria, this.token, page, size)
        .subscribe((response) => {
          this.products = response.content;
          this.totalPages = Math.ceil(response.totalElements / response.size);
          console.log(response)
        },
        (error) => { console.log(error); }
        );
    }
  }

  changePage(direction: 'next' | 'prev') : void {
    if(direction === 'next' && this.currentPage < this.totalPages! - 1) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 0){
      this.currentPage--;
    }
    this.getProductByCategory(this.currentPage, this.pageSize);
  }

  clear() : void {
    this.product = {nome: '', descricao: '', preco: 0, quantidade: 0, categoria: ''};
    this.id = undefined;
    this.showIdInput = false;
    this.showCategoryInput = false;
  }

  clearAll() : void {
    this.products = [];
    this.categoria = this.product.categoria;
    this.showIdInput = false;
    this.showCategoryInput = false;
  }
}
