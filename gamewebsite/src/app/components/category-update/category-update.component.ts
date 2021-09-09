import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category';
import { ItemResponseModel } from 'src/app/models/itemResponseModel';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit {

  categoryUpdateForm : FormGroup;
  category:Category;
  categoryId:number;
  categoryName:string;
  apiUrl = "https://localhost:44365/api/";

  constructor(
    private categoryService:CategoryService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createCategoryUpdateForm();
      if(params["categoryId"]){
        this.getByCategoryId(params["categoryId"])
      }
    })
  }

  getByCategoryId(categoryId:number){
    this.categoryService.getByCategoryId(this.activatedRoute.snapshot.params["categoryId"]).subscribe(response=>{
      this.category = response.data
      this.categoryId =this.category.categoryId
      this.categoryName = this.category.categoryName
    })
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm = this.formBuilder.group({
      categoryId:["",Validators.required],
      categoryName:["",Validators.required]
    });
  }

  update(){
    if (this.categoryUpdateForm.valid) {
      let categoryModel = Object.assign({}, this.categoryUpdateForm.value);
      this.categoryService.update(categoryModel).subscribe(response=>{
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



  /*
  backToList(){
    this.router.navigate(["brands/list"]);
  }*/


}
