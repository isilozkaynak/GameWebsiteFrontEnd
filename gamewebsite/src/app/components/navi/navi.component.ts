import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Customer } from 'src/app/models/customer';
import { Game } from 'src/app/models/game';
import { ProductDetail } from 'src/app/models/productDetail';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { GameService } from 'src/app/services/game.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  email = this.localStorageService.get("email");
  user: User;
  customer:Customer
  category:Category;
  categories:Category[] = [];
  game:Game;
  games:Game[]=[];
  filterText="";
  constructor(
    private gameService:GameService,
    private categoryService:CategoryService,
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private toastrService:ToastrService,
    private router:Router,
    private userService:UserService
    ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getGames();
    this.checkToLogin();
    this.checkToEmail();
    this.getEmail();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(response => {
      this.categories = response.data
    })
  }

  getGames(){
    this.gameService.getGames().subscribe(response => {
      this.games = response.data
    })
  }


  checkToLogin(){
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      return false;
    }
  }
  checkToEmail(){
    if(this.localStorageService.get("email")){

      return true;
    }else{
      return false;
    }
  }

  logOut(){
   this.localStorageService.clean()
    this.toastrService.success("Başarıyla Çıkış Yapıldı");
    this.router.navigate(["/"])
  }

  getEmail(){
    if(this.email){
      this.userService.getByEmail(this.email).subscribe(response=>{
        this.user = response;
      })
    }
  }

}
