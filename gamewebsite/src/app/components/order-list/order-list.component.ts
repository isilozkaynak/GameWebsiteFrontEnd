import { Component, OnInit } from '@angular/core';
import { OrderDetail } from 'src/app/models/orderDetail';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orderDetails:OrderDetail[]=[];

  constructor(
    private orderService:OrderService
  ) {}

  ngOnInit(): void {
    this.getOrderDetailDto();
  }

  getOrderDetailDto(){
    this.orderService.getOrderDetailDto().subscribe((response)=>{
      this.orderDetails = response.data
    })

  }
}
