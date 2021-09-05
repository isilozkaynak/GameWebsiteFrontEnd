import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  dataLoaded = false;

  constructor(private productService : ProductService, private activatedRoot : ActivatedRoute) {  }

  ngOnInit(): void {
    this.activatedRoot.params.subscribe(params=>{
      if(params["categoryId"]){
        this.getProductsByCategory(params["categoryId"]);
      }
      if(params["gameId"]){
        this.getProductsByGame(params["gameId"]);
      }
      else {
        this.getProducts();
      }
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId:number) {
    this.productService.getProductsByCategory(categoryId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

  getProductsByGame(gameId:number) {
    this.productService.getProductsByGame(gameId).subscribe(response=>{
      this.products = response.data
      this.dataLoaded = true;
    })
  }

}
