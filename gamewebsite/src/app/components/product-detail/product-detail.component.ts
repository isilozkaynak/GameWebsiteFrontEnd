import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/productImage';
import { ProductDetailService } from 'src/app/services/product-detail.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  basePath = "https://localhost:44365";
  products: Product[];
  productImages: ProductImage[];
  currentImage:ProductImage;

  constructor(private productService:ProductService, private router: Router, private productDetailService:ProductDetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["productId"]) {
        this.getProductDetail(params["productId"]);
        this.getProductImage(params["productId"]);
      }
    })
  }

  getProductImage(productId:number){
    this.productDetailService.getProductImageByProductId(productId).subscribe(response=>{
      this.productImages = response.data
    })
  }

  getProductDetail(productId: number) {
    this.productDetailService.getProductDetail(productId).subscribe(response=>{
      this.products = response.data
    })
  }

  getActivePhoto(index: number) {
    if (index == 0) {
      return "carousel-item active"
    }
    return "carousel-item"
  }

  getPath() {
    return this.basePath;
  }

  getButtonClass(image:ProductImage){
    if (image=this.productImages[0]) {
      return "active";
    }
    else{
      return "";
    }
  }

  getCurrentImageClass(image:ProductImage){
    if(this.productImages[0]==image){
      return "carousel-item active";
    } else {
      return "carousel-item ";
    }
  }

  setCurrentImageClass(image:ProductImage){
    this.currentImage = image;
  }



}
