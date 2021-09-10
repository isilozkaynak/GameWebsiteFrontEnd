import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { GameAddComponent } from './components/game-add/game-add.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';
import { GameUpdateComponent } from './components/game-update/game-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductComponent } from './components/product/product.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:ProductComponent},
  {path:"products", component:ProductComponent},
  {path:"products/category/:categoryId", component:ProductComponent},
  {path:"products/game/:gameId", component:ProductComponent},
  {path:"products/detail/:productId", component:ProductDetailComponent},
  {path:"products/detail/payment/:id",component:PaymentComponent},
  {path:"products/add", component:ProductAddComponent, canActivate:[LoginGuard]},
  {path:"products/update", component:ProductUpdateComponent, canActivate:[LoginGuard]},
  {path:"products/delete", component:ProductDeleteComponent, canActivate:[LoginGuard]},

  //category
  {path:"categories/add", component:CategoryAddComponent, canActivate:[LoginGuard]},
  {path:"categories/update", component:CategoryUpdateComponent, canActivate:[LoginGuard]},
  {path:"categories/delete", component:CategoryDeleteComponent, canActivate:[LoginGuard]},

  //game
  {path:"games/add", component:GameAddComponent, canActivate:[LoginGuard]},
  {path:"games/update", component:GameUpdateComponent, canActivate:[LoginGuard]},
  {path:"games/delete", component:GameDeleteComponent, canActivate:[LoginGuard]},

  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
