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


  selectedGame:string=null;
  games:Game[]=[];

  constructor(
    private gameService:GameService,
    private toastrServise:ToastrService
    ) { }



    ngOnInit(): void {
      this.getGames();
    }
  checkFilterClass()
  {
    if(this.selectedGame)
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
    if(this.selectedGame!=null)
    {
      return "/products/game/"+this.selectedGame

    }
    else{

    return "/products"
    }
  }

  getGames()
  {
    this.gameService.getGames().subscribe((response)=>
    {
      this.games=response.data;
    })
  }

}
