/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';
import { ProductDetail } from '../models/productDetail';
import { ProductImage } from '../models/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {
  apiUrl:string="https://localhost:44365/api/";

  constructor(private httpClient:HttpClient) { }


  getProductImageByProductId(productId:number):Observable<ListResponseModel<ProductImage>>{
    let newPath = this.apiUrl + "productimages/getimagesbyproductid?productId="+productId;
    return this.httpClient.get<ListResponseModel<ProductImage>>(newPath);
  }

  getProductDetail(productId: number): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getproductdetailsbyid?productId=" + productId;
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getProductDetails(): Observable<ListResponseModel<Product>> {
    let newPath = this.apiUrl + "products/getall";
    return this.httpClient.get<ListResponseModel<Product>>(newPath);
  }

  getImages(productId:number):Observable<ListResponseModel<ProductImage>>{
    let newPath = this.apiUrl + "productimages/getimagesbyproductid?productId="+productId
    return this.httpClient.get<ListResponseModel<ProductImage>>(newPath)
  }

} */
