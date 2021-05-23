import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  updatePerson(form: FormGroup) {
    return this.http.put(`${environment.URL}/person/`, form);
  }
  addPerson(form: any) {
    return this.http.post(`${environment.URL}/person/`, form);
  }

  updateUser(form: FormGroup) {
    return this.http.put(`${environment.URL}/user/`, form);
  }
  addUser(form: FormGroup) {
    return this.http.post(`${environment.URL}/user/`, form);
  }
}
