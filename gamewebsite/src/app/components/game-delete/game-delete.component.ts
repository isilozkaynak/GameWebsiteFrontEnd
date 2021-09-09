import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-delete',
  templateUrl: './game-delete.component.html',
  styleUrls: ['./game-delete.component.css']
})
export class GameDeleteComponent implements OnInit {

  gameDeleteForm : FormGroup;
  game:Game;
  gameId:number;
  gameName:string;
  releaseDate:any;
  descriptions:string;

  constructor(
    private gameService:GameService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createGameDeleteForm();
      if(params["gameId"]){
        this.getByGameId(params["gameId"])
      }
    })
  }


  getByGameId(gameId:number){
    this.gameService.getByGameId(this.activatedRoute.snapshot.params["gameId"]).subscribe(response=>{
      this.game = response.data
      this.gameId =this.game.gameId
      this.gameName = this.game.gameName
    })
  }

  createGameDeleteForm(){
    this.gameDeleteForm = this.formBuilder.group({
      id:["",Validators.required]
    });
  }

  delete(){
    if (this.gameDeleteForm.valid) {
      let gameModel = Object.assign({}, this.gameDeleteForm.value);
      this.gameService.delete(gameModel).subscribe(response=>{
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
