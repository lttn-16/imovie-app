import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  public resizeImage(url: string, width = "", height = ""):Observable<string> {
    return this.http.get<string>(`https://acqdgduijq.cloudimg.io/${url}?width=${width}&height=${height}`);
  }

  public subtitleProxy(url: string) {
    return `https://srt-to-vtt.vercel.app?url=${encodeURIComponent(url)}`
  }
}
