import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderResponseModel } from '../models/orderResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "https://localhost:44365/api/orders/getall";
  constructor(private httpClient: HttpClient) { }

  getProducts() :Observable<OrderResponseModel> {
    return this.httpClient.get<OrderResponseModel>(this.apiUrl);
}
}
