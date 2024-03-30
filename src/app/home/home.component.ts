import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../models/produc-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.yCdPVMPz5eIv_oZ4Js08DhLE4BoOuuXLOnKm6YIsN6A";
  products: ProductDTO[] = [];
  currentPage: number = 0;
  pageSize: number = 20;
  totalPages: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts(this.currentPage, this.pageSize)
  }

  getAllProducts(page: number, size:number) : void {
    this.productService.getAllProducts(this.token, page, size)
      .subscribe((response) => {
        console.log(response);
        this.products = response.content;
        this.totalPages = Math.ceil(response.totalElements / response.size);
      }, (error) => console.log(error));
  }

  changePage(direction: 'next' | 'prev') : void {
    if(direction === 'next' && this.currentPage < this.totalPages! - 1) {
      this.currentPage++;
    } else if (direction === 'prev' && this.currentPage > 0){
      this.currentPage--;
    }
    this.getAllProducts(this.currentPage, this.pageSize);
  }

  clearAll() : void {
    this.products = [];
  }
}
