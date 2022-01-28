import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { APIResponse, Home, HomeSection, TopBar, TopSearched } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getHome(page: number = 0):Observable<APIResponse<Home<HomeSection>>>{
    let params = new HttpParams().set('page', page);
    return this.http.get<APIResponse<Home<HomeSection>>>(`${env.BASE_URL}/homePage/getHome`, {params: params});
  }

  getTopSearched(): Observable<APIResponse<TopBar<TopSearched>>>{
    return this.http.get<APIResponse<TopBar<TopSearched>>>(`${env.BASE_URL}/search/v1/searchLeaderboard`);
  }
}
