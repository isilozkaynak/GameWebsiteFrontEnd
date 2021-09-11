import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProductImage } from 'src/app/models/productImage';
import { ProductDetail } from 'src/app/models/productDetail';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[]=[];
  product: Product;
  productDetail:ProductDetail[];
  dataLoaded:boolean = false;
  filterText = "";
  productImage:ProductImage[];
  imgUrl ="https://localhost:44365/";
  defaultImage="/images/default.jpg";
  welcomeImage="/images/welcome.jpg";
  basePath = "https://localhost:44365/products/";
  productImages: ProductImage[];
  currentImage:ProductImage;




  constructor(private productService: ProductService,
    private toastrService: ToastrService,
    private activatedRoot: ActivatedRoute,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private localstorageService: LocalStorageService,) { }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      }
      if (params["gameId"]) {
        this.getProductsByGame(params["gameId"]);
      }
      else {
        this.getProducts();
      }
    })
  }


  addToCart(product: Product) {
    this.toastrService.success("Sepete eklendi", product.productName);
    this.cartService.addToCart(product);
  }

  getProducts() {
    this.productService.getProducts().subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByGame(gameId: number) {
    this.productService.getProductsByGame(gameId).subscribe(response => {
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  addToFavorite(product: Product) {
    this.favoriteService.addToFavorite(product);

  }

}
