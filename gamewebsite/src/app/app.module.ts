import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { GameComponent } from './components/game/game.component';
import { CategoryComponent } from './components/category/category.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import {ToastrModule} from "ngx-toastr";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { CategoryAddComponent } from './components/category-add/category-add.component';
import { GameAddComponent } from './components/game-add/game-add.component';
import { CategoryUpdateComponent } from './components/category-update/category-update.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductDeleteComponent } from './components/product-delete/product-delete.component';
import { GameDeleteComponent } from './components/game-delete/game-delete.component';
import { GameUpdateComponent } from './components/game-update/game-update.component';
import { CategoryDeleteComponent } from './components/category-delete/category-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { FavoriteSummaryComponent } from './components/favorite-summary/favorite-summary.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderUpdateComponent } from './components/order-update/order-update.component';
import { OrderDeleteComponent } from './components/order-delete/order-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    GameComponent,
    CategoryComponent,
    CustomerComponent,
    OrderComponent,
    NaviComponent,
    ProductDetailComponent,
    VatAddedPipe,
    FilterPipePipe,
    CartSummaryComponent,
    PaymentComponent,
    ProductAddComponent,
    CategoryAddComponent,
    GameAddComponent,
    CategoryUpdateComponent,
    ProductUpdateComponent,
    ProductDeleteComponent,
    GameDeleteComponent,
    GameUpdateComponent,
    CategoryDeleteComponent,
    LoginComponent,
    ProductListComponent,
    CategoryListComponent,
    GameListComponent,
    ProductFilterComponent,
    FavoriteSummaryComponent,
    FooterComponent,
    ProfilComponent,
    RegisterComponent,
    AboutComponent,
    OrderListComponent,
    OrderUpdateComponent,
    OrderDeleteComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
