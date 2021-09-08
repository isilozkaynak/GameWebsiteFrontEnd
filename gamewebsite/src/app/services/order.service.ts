import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemResponseModel } from '../models/itemResponseModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Order } from '../models/order';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = "https://localhost:44365/api/";
  constructor(private httpClient: HttpClient) { }

  getOrders() :Observable<ListResponseModel<Order>> {
    let newPath = this.apiUrl + "orders/getall";
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
}

getByOrderId(id:number):Observable<ListResponseModel<Order>>{
  let newPath = this.apiUrl + "orders/getbyorderid?id="+id
  return this.httpClient.get<ListResponseModel<Order>>(newPath)
}
getByOrderIdSingle(id:number):Observable<ItemResponseModel<Order>>{
  let newPath = this.apiUrl + "orders/getbyorderid?id="+id
  return this.httpClient.get<ItemResponseModel<Order>>(newPath)
}
add(order:Order):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/add", order)
}
update(order:Order):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/update", order)
}
delete(order:Order):Observable<ResponseModel>{
  return this.httpClient.post<ResponseModel>(this.apiUrl+"orders/delete", order)
}



getOrderDetails():Observable<ListResponseModel<Order>>{
  let newPath = this.apiUrl + "orders/getorderdetails"
  return this.httpClient.get<ListResponseModel<Order>>(newPath);
}
getOrderDetailsByOrderId(orderId:number):Observable<ListResponseModel<Order>>{
  let newPath = this.apiUrl + "orders/getorderdetailsbyorderid?orderId="+orderId
  return this.httpClient.get<ListResponseModel<Order>>(newPath)
}
getOrderDetailsByOrderIdSingle(orderId:number):Observable<ItemResponseModel<Order>>{
  let newPath = this.apiUrl + "orders/getorderdetailsbyorderid?orderId="+orderId
  return this.httpClient.get<ItemResponseModel<Order>>(newPath)
}

}
