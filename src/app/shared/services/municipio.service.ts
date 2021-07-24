import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Municipio } from '../model/municipio.model';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {
  constructor(private http: HttpClient) { }

  public getMunicipios(depsv_id: number) {
    return this.http.get<Municipio[]>(`${environment.URL}/munsv/${depsv_id}`);
  }
}
