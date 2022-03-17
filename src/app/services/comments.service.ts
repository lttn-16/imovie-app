import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentType } from '../model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CommentsService {

  constructor(private http: HttpClient) { }

  onCreateComments(data: CommentType, id: string){
    return this.http.post(`https://imovie-14daf-default-rtdb.asia-southeast1.firebasedatabase.app/${id}.json`, data);
  }

  fetchComments(id: string){
    return this.http.get<{[key: string]: CommentType}>(`https://imovie-14daf-default-rtdb.asia-southeast1.firebasedatabase.app/${id}.json`,)
    .pipe(
      map(responseData => {
        const dataArray: CommentType[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            dataArray.push({ ...responseData[key], id: key });
          }
        }
        return dataArray;
      })
    )
  }
}
