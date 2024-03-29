import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { GetProductComponent } from './get-product/get-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{path: 'create-product', component: CreateProductComponent},
                        {path: 'get-product', component: GetProductComponent},
                        {path: 'delete-product', component: DeleteProductComponent},
                        {path: 'edit-product/:id', component: EditProductComponent},
                        {path:'home', component: HomeComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
