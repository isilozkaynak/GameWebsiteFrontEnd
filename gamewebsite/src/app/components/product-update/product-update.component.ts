import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productUpdateForm : FormGroup;
  product:Product;
  productId:number;
  productName:string;
  unitPrice:number;
  gameId:number;
  categoryId:number;
  releaseDate:any;
  descriptionProduct:string;

  apiUrl = "https://localhost:44365/api/";

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createProductUpdateForm();
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
      this.unitPrice=this.product.unitPrice
      this.categoryId=this.product.categoryId
      this.gameId=this.product.gameId
      this.releaseDate=this.product.releaseDate
      this.descriptionProduct=this.product.descriptionProduct
    })
  }

  createProductUpdateForm(){
    this.productUpdateForm = this.formBuilder.group({
      productName: ["", Validators.required],
      unitPrice: ["", Validators.required],
      categoryId: ["", Validators.required],
      gameId: ["", Validators.required],
      releaseDate: ["", Validators.required],
      descriptionProduct: ["", Validators.required]
    });
  }

  update(){
    if (this.productUpdateForm.valid) {
      let productModel = Object.assign({}, this.productUpdateForm.value);
      this.productService.update(productModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        //this.backToList();
      }
      ,
      (responseError)=>
      {
            this.toastrService.error("Bu işleme yetkiniz yoktur.","Doğrulama hatası")
            console.log(responseError);

      }
      );
    } else {
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

}
