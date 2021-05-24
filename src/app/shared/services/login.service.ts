import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';
import notie from 'notie';
import { Session } from '../model/session.model';
import { Municipio } from '../model/municipio.model';
import { Person } from '../model/person.model';

const SESSION_LOCAL = 'SESSION_TOKEN';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public SESSION: Session = new Session();

  // Metodos extra
  clearStorage = () => {
    try {
      localStorage.clear();
      this.SESSION = new Session();
      this.router.navigate(['/']);
    } catch (error) {
        console.log(error);
    }
  }

  constructor(private http: HttpClient, private router: Router) {
    this.initLocalStorage();
  }

  public login(user: User) {
    return this.http.post<User>(`${environment.URL}/user`, user);
  }

  public getUser(): void {
    this.http.get<User>(`${environment.URL}/user/${this.SESSION?.u_token ? this.SESSION.u_token : -1}`).subscribe(
      result => {
        if(result?.id && result?.id != -1) {
          this.SESSION.u_token = result.id || -1;
          this.SESSION.p_token = result.persona_id;
          this.SESSION.access = result.rol;
          this.SESSION.user = result.username;
          this.SESSION.m_token = result.municipio_id;
          
          this.addLocalStorage(this.SESSION);
        }
        else {
          this.SESSION = new Session();
          this.addLocalStorage(this.SESSION);
        }
      }
    );
  }

  public destroySession(): void {
    notie.confirm({
      text: '¿Desea cerrar sesión?',
      submitText: 'Confirmar',
      cancelText: 'Cancelar',
      submitCallback: this.clearStorage
    });
  }

  // Local Storage
  private addLocalStorage(session: Session) {
    localStorage.setItem(SESSION_LOCAL, JSON.stringify(session));
  }
  public getLocalStorage() {
    try {
      this.SESSION = JSON.parse(localStorage.getItem(SESSION_LOCAL) || '{}');
    } catch (error) {
      console.log(error);
    }
  }
  private initLocalStorage() {
    this.SESSION = JSON.parse(localStorage.getItem(SESSION_LOCAL) || '{}');
    if(!this.SESSION) {
      localStorage.setItem(SESSION_LOCAL, JSON.stringify(new Session()));
    }
    this.getLocalStorage();
  }

}
