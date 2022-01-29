import { Injectable } from '@angular/core';
import { Details } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor() {}

  addHistory(item: Details){
    let newMovie = [];
    if(localStorage.getItem('history')){
      const data = localStorage.getItem('history');
      if (data) newMovie = JSON.parse(data); 
      const sort = newMovie.find((movie:Details) => movie.id === item.id);
      if(sort) return;
      else newMovie = [item, ...newMovie];
    } else{
      newMovie = [item];
    }
    localStorage.setItem("history", JSON.stringify(newMovie));
  }

  removeHistory():void{
    localStorage.removeItem("history");
  }

  async getHistory(){
    const storage = await localStorage.getItem("history");
    if (storage) return JSON.parse(storage);
  }
}
