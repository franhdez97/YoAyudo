import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fecha_nac: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      genero: new FormControl('', [Validators.required]),
      depsv: new FormControl('', [Validators.required]),
      munsv: new FormControl('', [Validators.required])
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

    console.log('Funca xd');
  }

}
