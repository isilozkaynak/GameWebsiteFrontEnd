import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[] = [];
  dataLoaded = false;

  orderAddForm: FormGroup;
  order: Order;
  product: Product;
  userId: number;
  productId: number;
  orderId: number;

  user: User;

  apiUrl = "https://localhost:44365/api/";
  //email = this.localStorageService.get('email');

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    //private localStorageService: LocalStorageService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getOrders();

    //this.getEmail();
    this.createOrderAddForm();
    this.activatedRoute.params.subscribe((params) => {
      this.getProductDetailsByProductId(params['productId']);
    });
  }

  getOrders() {
    this.orderService.getOrders().subscribe(response => {
      this.orders = response.data
      this.dataLoaded = true;
    });
  }

  getProductDetailsByProductId(productId: number) {
    this.productService.getProductDetailsByProductIdSingle(productId).subscribe((response) => {
      this.product = response.data;
    });
  }


  createOrderAddForm() {
    this.orderAddForm = this.formBuilder.group({
      userId: ['', Validators.required],
      productId: ['', Validators.required],
    });
  }
  addOrder() {
    if (this.orderAddForm.valid) {
      let productModel = Object.assign({}, this.orderAddForm.value);
      this.orderService.add(productModel).subscribe((response) => {
        this.toastrService.success(
          'Ödeme sayfasına yönlendiriliyorsunuz.',
          'Başarılı işlem'
        );
        this.router.navigate(['products/detail/payment', this.product.productId]);
      },
        (responseError) => {
          this.toastrService.error(
            responseError.error.message,
            'Doğrulama hatası'
          );
        }
      );
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  /*
  getEmail() {
    if (this.email) {
      this.userService.getByEmail(this.email).subscribe((response) => {
        this.user = response;
      });
    }

  } */
}
