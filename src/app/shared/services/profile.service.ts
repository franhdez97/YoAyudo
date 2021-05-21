import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Person } from '../model/person.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPersonById(id: number) {
    return this.http.get<Person>(`${environment.URL}/person/${id}`);
  }
}
