import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { ItemResponseModel } from '../models/itemResponseModel';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl = "https://localhost:44365/api/";
  constructor(private httpClient: HttpClient) { }

  getGames(): Observable<ListResponseModel<Game>> {
    let newPath = this.apiUrl + "games/getall";
    return this.httpClient.get<ListResponseModel<Game>>(newPath);
  }

  getByGameId(gameId:number): Observable<ItemResponseModel<Game>> {
    let newPath = this.apiUrl + "games/getbyid?gameId="+gameId;
    return this.httpClient.get<ItemResponseModel<Game>>(newPath);
  }

  add(game: Game): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "games/add", game)
  }

  update(game: Game):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"games/update", game)
  }

  delete(game: Game):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"games/delete", game)
  }
}
