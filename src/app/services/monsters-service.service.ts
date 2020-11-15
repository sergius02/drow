import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { APIReferenceList, APIReference } from '../interfaces/api-reference';
import { Monster } from '../interfaces/monster';

@Injectable({
  providedIn: 'root'
})
export class MonstersService {

  private baseURL = 'https://www.dnd5eapi.co/api/monsters';

  constructor(
    private http: HttpClient
  ) { }


  getAllMonsters(): Observable<APIReference[]> {
    return this.http
      .get<APIReferenceList>(this.baseURL)
      .pipe(map( response => response.results ));
  }

  getMonsterInfo(index: string): Observable<Monster> {
    return this.http.get<Monster>(`${this.baseURL}/${index}`);
  }

}
