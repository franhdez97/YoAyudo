import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {

  constructor(public loginServ: LoginService) { }

  ngOnInit(): void {
    this.loginServ.getLocalStorage();
  }

}
