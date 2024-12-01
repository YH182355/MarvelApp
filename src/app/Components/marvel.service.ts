import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private apiUrl = 'http://gateway.marvel.com/v1/public/comics';
  private publicKey = '01e5356ffcd9542ce9224f7bdcf9d339';
  private hash = 'ef1186e9d8ede8aba2db5e51c3776e13';
  private ts = '1'; // El timestamp que usaste para generar el hash

  constructor(private http: HttpClient) { }

  getComics(): Observable<any> {
    const url = `${this.apiUrl}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }

  getComicsFav(): Observable<any>{
    const url = `${this.apiUrl}?ts=${this.ts}&apikey=${this.publicKey}&hash=${this.hash}`;
    return this.http.get(url);
  }
}