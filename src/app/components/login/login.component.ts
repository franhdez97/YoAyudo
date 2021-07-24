import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user.model';
import { LoginService } from 'src/app/shared/services/login.service';
import notie from 'notie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  constructor(
    private loginServ: LoginService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      passwd: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loginServ.getLocalStorage();
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if (this.formLogin.valid) {
      const user: User = new User();
      user.username = this.formLogin.value.username;
      user.passwd = this.formLogin.value.passwd;

      this.loginServ.login(user).subscribe(
        result => {
          if(result?.id) {
            this.loginServ.SESSION.u_token = result.id;
            this.loginServ.SESSION.p_token = result.persona_id;
            this.loginServ.SESSION.access = result.rol;
            this.loginServ.SESSION.m_token = result.municipio_id;
            this.router.navigate(['/', 'home']);
          }
          else {
            notie.alert({ 'type': 'error', 'text': 'El correo o contraseña no coinciden'});
          }
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

}
