import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { LoginService } from 'src/app/shared/services/login.service';
import notie from 'notie';

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
            this.loginServ.SESSION = result;
            this.loginServ.getUser();
            // this.router.navigate(['/home']);
          }
          else {
            notie.alert({ 'type': 'error', 'text': 'El correo o contraseña no coinciden'})
          }
        }
      );
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

}
