import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductDTO } from '../models/produc-dto';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  id: number | undefined;
  product: ProductDTO = {nome: '', descricao: '', preco: 0, quantidade: 0, categoria: ''}
  token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQURNSU4iLCJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.yCdPVMPz5eIv_oZ4Js08DhLE4BoOuuXLOnKm6YIsN6A";
  message: string = '';
  confirmDelete: boolean = false;
  isError: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  confirmDeletion() {
    this.confirmDelete = true;
  }
  
  resetAndCancelDeletion() {
    this.id = undefined;
    this.confirmDelete = false;
    this.message = '';
  }

  deleteProductById() : void {
    if(this.id){
      this.productService.deleteProductById(this.id, this.token)
        .subscribe((response) => {
          this.message = 'Produto deletado com sucesso!';
          this.isError = false;
          setTimeout(() => {this.resetAndCancelDeletion();}, 3000);
          console.log(response);
          
        },
        (error) => { console.log(error); 
          this.message = 'Erro ao deletar produto!';
          this.isError = true;
          setTimeout(() => {this.resetAndCancelDeletion()}, 3000);
          
        }
        );
    }
  }
}
