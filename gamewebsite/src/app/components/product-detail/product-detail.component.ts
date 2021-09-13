import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/game';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { ProductImage } from 'src/app/models/productImage';
/*import { ProductDetailService } from 'src/app/services/product-detail.service'; */
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  basePath = "https://localhost:44365/products/";
  products: Product[]=[];
  product:Product;
  productDetail:ProductDetail[];
  productImages: ProductImage[];
  currentImage:ProductImage;
  imgUrl ="https://localhost:44365/";
  defaultImage="images/default.jpg";

  constructor(private productService:ProductService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProductDetails();
      if (params["productId"]) {
        this.getProductDetailsByProductId(params["productId"]);
      }
    })
  }

  getProductDetails(){
    this.productService.getProductDetails().subscribe(response => {
    this.products = response.data;
    })
  }
  getProductDetailsByProductId(productId:number){
    this.productService.getProductDetailsByProductId(productId).subscribe(response =>{
      this.product = response.data[0]
    })
  }
}
