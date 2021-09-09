import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {

  categoryDeleteForm : FormGroup;
  category:Category;
  categoryId:number;
  categoryName:string;

  constructor(
    private categoryService:CategoryService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createCategoryDeleteForm();
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

  createCategoryDeleteForm(){
    this.categoryDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    });
  }

  delete(){
    if (this.categoryDeleteForm.valid) {
      let categoryModel = Object.assign({}, this.categoryDeleteForm.value);
      this.categoryService.delete(categoryModel).subscribe(response=>{
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

  /*
  backToList(){
    this.router.navigate(["categories/list"]);
  } */

}
