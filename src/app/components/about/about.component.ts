import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {

  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
    this.loginServ.getLocalStorage();
  }

}
