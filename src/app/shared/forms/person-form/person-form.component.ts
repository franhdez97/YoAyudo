import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Person } from '../../model/person.model';
import { LoginService } from '../../services/login.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.sass']
})
export class PersonFormComponent implements OnInit {

  person: Person = new Person();
  formPersona: FormGroup;

  constructor(
    public loginServ: LoginService,
    private profileServ: ProfileService
  ) {
    this.formPersona = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      lugar: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      importancia: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loginServ.getLocalStorage();
    if(this.loginServ.SESSION?.persona_id) {
      this.profileServ.getPersonById(this.loginServ.SESSION?.persona_id).subscribe(
        data => {
          this.person = data;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  public sendForm(event: Event) {
    event.preventDefault();
  }

}
