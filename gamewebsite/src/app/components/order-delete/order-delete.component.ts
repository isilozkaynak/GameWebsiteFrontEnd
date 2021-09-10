import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-delete',
  templateUrl: './order-delete.component.html',
  styleUrls: ['./order-delete.component.css']
})
export class OrderDeleteComponent implements OnInit {

  orderDeleteForm : FormGroup;
  order:Order;
  orderId:number;

  constructor(
    private orderService:OrderService,
    private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params["orderId"]){
        this.getByOrderId(params["orderId"])
        this.createOrderForm();
      }
    })
  }

  getByOrderId(id:number){
    this.orderService.getByOrderIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response=>{
      this.order = response.data
      this.orderId = this.order.orderId
    })
  }

  createOrderForm(){
    this.orderDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    })
  }
  delete(){
    if(this.orderDeleteForm.valid){
      let orderModel = Object.assign({}, this.orderDeleteForm.value);
      this.orderService.delete(orderModel).subscribe(response=>{
        this.toastrService.success("Sipariş silindi","Başarılı")
        this.backToList();
      },(responseError)=>{
        this.toastrService.error(responseError.error.message,'İşlem başarısız');
      }
      );
  }else{
    this.toastrService.error('Formunuz eksik', 'Dikkat')
  }
}
backToList(){
  this.router.navigate(["orders/list"])
}

}
