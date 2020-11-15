import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {APIReference, APIReferenceList} from '../interfaces/api-reference';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassesServiceService {

  private baseURL = 'https://www.dnd5eapi.co/api/classes';

  constructor(
    private http: HttpClient
  ) { }

  getAllClasses(): Observable<APIReference[]> {
    return this.http
      .get<APIReferenceList>(this.baseURL)
      .pipe(map(response => response.results));
  }

}
