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


  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  getAllProducts() : void {
    this.productService.getAllProducts(this.token)
      .subscribe((response) => {
        console.log(response);
        this.products = response;
      }, (error) => console.log(error));
  }

  clearAll() : void {
    this.products = [];
  }
}
