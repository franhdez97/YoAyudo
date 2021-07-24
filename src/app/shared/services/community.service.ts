import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Report } from '../model/report.model';
@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient) { }

  public getReports(munsv: number) {
    return this.http.get<Report[]>(`${environment.URL}/report/${munsv}`);
  }
  public addReport(report: Report) {
    return this.http.post(`${environment.URL}/report`,report);
  }

}
