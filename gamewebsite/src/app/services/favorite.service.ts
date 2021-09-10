import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteItem } from '../models/favoriteItem';
import { FavoriteItems } from '../models/favoriteItems';
import { Product } from '../models/product';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService
    ) { }

  addToFavorite(product:Product){
    let item = FavoriteItems.find(p => p.product.productId===product.productId);
    if(item){
      this.toastrService.info(product.productName + " favorilerinizde zaten mevcut","Favorilerde ekli")
    }else{
    let favoriteItem = new FavoriteItem();
    favoriteItem.product = product;
    FavoriteItems.push(favoriteItem)
    this.localStorageService.set("productId", JSON.stringify(product.productId));
    }

  }

  removeFromFavorite(product:Product){
    let item:FavoriteItem =  FavoriteItems.find(p=>p.product.productId===product.productId);
    FavoriteItems.splice(FavoriteItems.indexOf(item),1)
    this.localStorageService.remove("productId")
  }

  list():FavoriteItem[]{
    return FavoriteItems
  }
}
