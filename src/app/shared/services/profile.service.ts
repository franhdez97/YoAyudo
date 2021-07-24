import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Person } from '../model/person.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getPersonById(id: number) {
    return this.http.get<Person>(`${environment.URL}/person/${id}`);
  }
  updatePerson(form: FormData) {
    return this.http.put(`${environment.URL}/person/`, form);
  }
  addPerson(form: FormData) {
    return this.http.post(`${environment.URL}/person/`, form);
  }
  existsUser(user: User) {
    return this.http.post(`${environment.URL}/user/existsUser/`, user);
  }

  updateUser(form: FormGroup) {
    return this.http.put(`${environment.URL}/user/`, form);
  }
}
