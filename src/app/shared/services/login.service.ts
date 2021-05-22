import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../model/user.model';
import notie from 'notie';

const USER_LOCAL = 'YoAyudo_SESSION';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public SESSION: User = new User();

  // Metodos extra
  clearStorage = () => {
    try {
      localStorage.clear();
      this.SESSION = new User();
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
    this.http.get<User>(`${environment.URL}/user/${this.SESSION?.id ? this.SESSION.id : -1}`).subscribe(
      result => {
        if(result?.id) {
          this.SESSION = result;
          this.addLocalStorage(result);
        }
        else {
          this.SESSION = new User();
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
  private addLocalStorage(user: User) {
    localStorage.setItem(USER_LOCAL, JSON.stringify(user));
  }
  public getLocalStorage() {
    try {
      this.SESSION = JSON.parse(localStorage.getItem(USER_LOCAL) || '{}');
    } catch (error) {
      console.log(error);
    }
  }
  private initLocalStorage() {
    this.SESSION = JSON.parse(localStorage.getItem(USER_LOCAL) || '{}');
    if(!this.SESSION) {
      localStorage.setItem(USER_LOCAL, JSON.stringify(new User()));
    }
    this.getLocalStorage();
  }

}
