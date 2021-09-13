import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  imgUrl ="https://localhost:44365/";
  loginImage="images/login.jpg";
  isSuccess = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router:Router,
    private localStorageService:LocalStorageService

    ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  /*
  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.localStorageService.set("token",response.data.token)
        console.log("hey!!");
        this.localStorageService.set("email",this.loginForm.value.email)
        window.location.assign("products")
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token)
        this.toastrService.success("Giriş yapıldı", "Başarılı")
        this.router.navigate(["products"])
      }, responseError => {
        console.log(responseError)
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Lütfen boş bırakmayınız...")
    }
  } */
  login(){
    if(this.loginForm.valid){
    let loginModel = Object.assign({},this.loginForm.value)

    this.authService.login(loginModel).subscribe(response=>{
      this.toastrService.success("Giriş yapıldı", "Başarılı")
      //this.localStorageService.set("token",response.data.token)
      this.localStorageService.set("email",this.loginForm.value.email)
      window.location.assign("products")
    },responseError=>{
      this.toastrService.error(responseError.error)
    })
    }else{
      this.toastrService.error("Lütfen boş bırakmayınız...")
    }
  }



}
