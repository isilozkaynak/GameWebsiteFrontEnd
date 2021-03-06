import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  games: Game[] = [];
  currentGame : Game;
  dataLoaded = false;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.getGames();
  }

  getGames() {
    this.gameService.getGames().subscribe(response => {
      this.games = response.data
      this.dataLoaded = true;
    });
  }


  setCurrentGame(game:Game){
    this.currentGame = game;
  }

  getCurrentGameClass(game:Game){
    if(game==this.currentGame){
      return "list-group-item active";
    }
    else {
      return "list-group-item";
    }
  }

}
