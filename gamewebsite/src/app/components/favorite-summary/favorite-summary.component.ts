import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteItem } from 'src/app/models/favoriteItem';
import { Product } from 'src/app/models/product';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favorite-summary',
  templateUrl: './favorite-summary.component.html',
  styleUrls: ['./favorite-summary.component.css']
})
export class FavoriteSummaryComponent implements OnInit {

  favoriteItems:FavoriteItem[]=[]

  constructor(
    private favoriteService:FavoriteService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getFavorite();
  }

  getFavorite(){
    this.favoriteItems = this.favoriteService.list();
  }

  removeFromFavorite(product:Product){
    this.favoriteService.removeFromFavorite(product);
    this.toastrService.info(product.productName + " favorilerinizden kaldırıldı", "Kaldırıldı")
  }

}
