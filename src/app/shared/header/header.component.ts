import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.loginServ.destroySession();
  }

}
