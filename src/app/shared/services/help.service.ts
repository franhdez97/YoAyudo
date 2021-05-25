import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Help } from '../model/help.model';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http: HttpClient) { }

  public getHelp(help: any) {
    return this.http.post<Help[]>(`${environment.URL}/help/getHelps`, help);
  }
  public addReport(help: Help) {
    return this.http.post(`${environment.URL}/help`, help);
  }
  public updateState(help) {
    return this.http.put(`${environment.URL}/help/updateState`, help);
  }
}
