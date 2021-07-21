import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user.model';
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

      this.router.navigate(['/', 'home']);
    } else {
      this.formLogin.markAllAsTouched();
    }
  }

}
