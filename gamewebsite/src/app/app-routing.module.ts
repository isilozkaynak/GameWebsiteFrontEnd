import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { GameAddComponent } from './components/game-add/game-add.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameUpdateComponent } from './components/game-update/game-update.component';
import { LoginComponent } from './components/login/login.component';
import { OrderDeleteComponent } from './components/order-delete/order-delete.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductComponent } from './components/product/product.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full", component:ProductComponent},
  {path:"products", component:ProductComponent},
  {path:"products/category/:categoryId", component:ProductComponent},
  {path:"products/game/:gameId", component:ProductComponent},
  {path:"products/detail/:productId", component:ProductDetailComponent},
  {path:"products/detail/payment/:id",component:PaymentComponent},
  {path:"products/add", component:ProductAddComponent, canActivate:[LoginGuard]},
  {path:"products/update", component:ProductUpdateComponent},
  {path:"products/update/:id", component:ProductUpdateComponent},
  {path:"products/delete", component:ProductDeleteComponent, canActivate:[LoginGuard]},
  {path:"products/delete/:id", component:ProductDeleteComponent, canActivate:[LoginGuard]},
  {path:"products/list", component:ProductListComponent},
  {path:"products/list/add", component:ProductListComponent, canActivate:[LoginGuard]},

  //category
  {path:"categories/list", component:CategoryListComponent, canActivate:[LoginGuard]},
  {path:"categories/add", component:CategoryAddComponent, canActivate:[LoginGuard]},
  {path:"categories/update", component:CategoryUpdateComponent, canActivate:[LoginGuard]},
  {path:"categories/delete", component:CategoryDeleteComponent, canActivate:[LoginGuard]},

  //game
  {path:"games/list", component:GameListComponent, canActivate:[LoginGuard]},
  {path:"games/add", component:GameAddComponent, canActivate:[LoginGuard]},
  {path:"games/update", component:GameUpdateComponent, canActivate:[LoginGuard]},
  {path:"games/delete", component:GameDeleteComponent, canActivate:[LoginGuard]},

  {path:"profil",component:ProfilComponent},
  {path:"about", component:AboutComponent},

  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},

  {path:"details/payment/:id",component:PaymentComponent},

  {path:"orders/list",component:OrderListComponent},
  {path:"orders/list/update/:id",component:OrderUpdateComponent},
  {path:"orders/list/delete/:id",component:OrderDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
