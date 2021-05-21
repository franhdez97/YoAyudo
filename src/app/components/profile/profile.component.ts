import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/shared/model/person.model';
import { LoginService } from 'src/app/shared/services/login.service';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(
    public loginServ: LoginService
  ) {
    
  }

  ngOnInit(): void {
  }

}
