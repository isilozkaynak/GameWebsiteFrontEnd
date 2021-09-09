import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  productDeleteForm : FormGroup;
  product:Product;
  productId:number;
  productName:string;
  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createProductDeleteForm();
      if(params["productId"]){
        this.getByProductId(params["productId"])
      }
    })
  }

  getByProductId(productId:number){
    this.productService.getByProductId(this.activatedRoute.snapshot.params["productId"]).subscribe(response=>{
      this.product = response.data
      this.productId =this.product.productId
      this.productName = this.product.productName
    })
  }

  createProductDeleteForm(){
    this.productDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    });
  }

  delete(){
    if (this.productDeleteForm.valid) {
      let productModel = Object.assign({}, this.productDeleteForm.value);
      this.productService.delete(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        //this.backToList();
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
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

}
