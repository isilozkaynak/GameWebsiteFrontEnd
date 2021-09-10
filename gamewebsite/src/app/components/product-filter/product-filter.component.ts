import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Game } from 'src/app/models/game';
import { CategoryService } from 'src/app/services/category.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  selectedCategory:string=null;
  selectedGame:string=null;
  categories:Category[]=[];
  games:Game[]=[];

  constructor(private categoryService:CategoryService,
    private gameService:GameService,
    private toastrServise:ToastrService
    ) { }



    ngOnInit(): void {
      this.getCategories();
      this.getGames();
    }
  checkFilterClass()
  {
    if(this.selectedCategory||this.selectedGame)
    {
      return "btn btn-primary"
    }
    else
    {
      return "btn btn-primary disabled"
    }
  }
  routingLink()
  {
    if(this.selectedCategory!=null&&this.selectedGame!=null)
    {
      return "/products/category/"+this.selectedCategory+"/game/"+this.selectedGame

    }
    else if(this.selectedGame!=null&&this.selectedCategory==null)
    {
      return "/products/game/"+this.selectedGame

    }
    else if(this.selectedCategory!=null&&this.selectedGame==null)
    {

      return "products/category/"+this.selectedCategory
    }
    else{

    return "/products"
    }
  }
  getCategories()
  {
    this.categoryService.getCategories().subscribe((response)=>
    {
      this.categories=response.data;
    })
  }
  getGames()
  {
    this.gameService.getGames().subscribe((response)=>
    {
      this.games=response.data;
    })
  }

}
