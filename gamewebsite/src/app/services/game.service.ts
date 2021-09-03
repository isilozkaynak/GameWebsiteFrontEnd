import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { ListResponseModel } from '../models/listResponseModel';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  apiUrl = "https://localhost:44365/api/games/getall";
  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ListResponseModel<Game>> {
    return this.httpClient.get<ListResponseModel<Game>>(this.apiUrl);
  }
}
