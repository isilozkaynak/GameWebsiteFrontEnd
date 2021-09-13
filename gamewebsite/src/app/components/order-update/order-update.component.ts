import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-update',
  templateUrl: './order-update.component.html',
  styleUrls: ['./order-update.component.css']
})
export class OrderUpdateComponent implements OnInit {
  orderUpdateForm : FormGroup;
  order:Order
  user:User;
  product:Product;
  products:Product[]=[];
  users:User[]=[];
    orderId:number;
    productId:number;
    userId:number;
    orderDate:Date;

  constructor(
    private productService:ProductService,
    private userService:UserService,
    private orderService:OrderService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
        this.getProductDetails();
        this.getUsers();
    this.activatedRoute.params.subscribe(params => {
      if(params["orderId"]){
        this.getById(params["orderId"]);
        this.createOrderForm();
      }
    })
  }
  getProductDetails(){
    this.productService.getProductDetails().subscribe(response =>{
      this.products = response.data
    })
  }
  getUsers(){
    this.userService.getUsers().subscribe(response =>{
      this.users = response.data
    })
  }
  getById(id:number){
    this.orderService.getByOrderIdSingle(this.activatedRoute.snapshot.params["id"]).subscribe(response =>{
      this.order = response.data
      this.orderId = this.order.orderId
      this.userId = this.order.userId
      this.productId = this.order.productId
      this.orderDate = this.order.orderDate
    })
  }
  createOrderForm(){
    this.orderUpdateForm = this.formBuilder.group({
      orderId:["",Validators.required],
      userId:["",Validators.required],
      productId:["",Validators.required],
      orderDate:["",Validators.required],
    })
  }
  update(){
    if (this.orderUpdateForm.valid) {
      let orderModel = Object.assign({}, this.orderUpdateForm.value);
      this.orderService.update(orderModel).subscribe(response=>{
        this.toastrService.success("Sipariş güncellendi","Başarılı")
      }
      ,
      (responseError)=>
      {
        if(responseError.error.Errors.length>0){
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama hatası")
          }
        }
      }
      );
    }
    else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}
