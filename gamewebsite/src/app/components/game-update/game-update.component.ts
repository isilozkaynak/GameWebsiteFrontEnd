import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-game-update',
  templateUrl: './game-update.component.html',
  styleUrls: ['./game-update.component.css']
})
export class GameUpdateComponent implements OnInit {

  gameUpdateForm : FormGroup;
  game:Game;
  gameId:number;
  gameName:string;
  releaseDate:any;
  descriptions:string;

  apiUrl = "https://localhost:44365/api/";

  constructor(
    private gameService:GameService,
    private activatedRoute:ActivatedRoute,
    private toastrService:ToastrService,
    private formBuilder:FormBuilder,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.createGameUpdateForm();
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
      this.releaseDate = this.game.releaseDate
      this.descriptions = this.game.descriptions
    })
  }

  createGameUpdateForm(){
    this.gameUpdateForm = this.formBuilder.group({
      gameId:["",Validators.required],
      gameName:["",Validators.required],
      releaseDate:["",Validators.required],
      descriptions:["",Validators.required]
    });
  }

  update(){
    if (this.gameUpdateForm.valid) {
      let gameModel = Object.assign({}, this.gameUpdateForm.value);
      this.gameService.update(gameModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
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
