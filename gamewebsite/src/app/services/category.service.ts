import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl = "https://localhost:44365/api/";
  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<ListResponseModel<Category>> {
    let newPath = this.apiUrl + "categories/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  add(category: Category): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "categories/add", category)
  }

  update(category: Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"categories/update", category)
  }

  delete(category: Category):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"delete", category)
  }

  getByCategoryId(categoryId:number):Observable<ItemResponseModel<Category>>{
    let newPath = this.apiUrl + "categories/getbycategoryid?id="+categoryId
    return this.httpClient.get<ItemResponseModel<Category>>(newPath)
  }
}
