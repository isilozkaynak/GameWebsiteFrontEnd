import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { GameAddComponent } from './components/game-add/game-add.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';
import { GameUpdateComponent } from './components/game-update/game-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
  {path:"", pathMatch:"full", component:ProductComponent},
  {path:"products", component:ProductComponent},
  {path:"products/category/:categoryId", component:ProductComponent},
  {path:"products/game/:gameId", component:ProductComponent},
  {path:"products/detail/:productId", component:ProductDetailComponent},
  {path:"products/detail/payment/:id",component:PaymentComponent},
  {path:"products/add", component:ProductAddComponent},
  {path:"products/update", component:ProductUpdateComponent},
  {path:"products/delete", component:ProductDeleteComponent},

  //category
  {path:"categories/add", component:CategoryAddComponent},
  {path:"categories/update", component:CategoryUpdateComponent},
  {path:"categories/delete", component:CategoryDeleteComponent},

  //game
  {path:"games/add", component:GameAddComponent}
  {path:"games/update", component:GameUpdateComponent},
  {path:"games/delete", component:GameDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
