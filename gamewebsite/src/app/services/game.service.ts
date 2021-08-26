import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GameResponseModel } from '../models/gameResponseModel';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl = "https://localhost:44365/api/games/getall";
  constructor(private httpClient: HttpClient) { }

  getProducts() :Observable<GameResponseModel> {
    return this.httpClient.get<GameResponseModel>(this.apiUrl);
}
}
