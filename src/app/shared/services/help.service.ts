import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Help } from '../model/help.model';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http: HttpClient) { }

  public getHelp(rol: number) {
    return this.http.get<Help[]>(`${environment.URL}/help/${rol}`);
  }
  public addReport(help: Help) {
    this.http.post(`${environment.URL}/help`, help);
  }
}
