import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { ProductImage } from 'src/app/models/productImage';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm:FormGroup;
  product: Product;
  productImages: ProductImage;
  order: Order;
  imgUrl ="https://localhost:44365/";
  apiUrl = "https://localhost:44365/api/";
  defaultImage = "images/default.jpg";
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private orderService: OrderService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProductDetailsByProductId(params["id"]);
      this.getOrderDetailsByOrderId(params["id"]);
    })
  }

  getOrderDetailsByOrderId(id: number) {
    this.orderService.getOrderDetailsByOrderId(id).subscribe((response) => {
      this.order = response.data.pop();
    })
  }

  getProductDetailsByProductId(id: number) {
    this.productService.getProductDetailsByProductId(id).subscribe((response) => {
      this.product = response.data[0];
    })
  }

  payment() {
    this.toastrService.success("Oyun satın alındı. İyi eğlenceler.", "Ödeme başarılı")
    this.router.navigate(["products"])
  }


}
