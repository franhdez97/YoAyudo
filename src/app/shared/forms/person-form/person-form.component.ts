import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipio } from '../../model/municipio.model';
import { Person } from '../../model/person.model';
import notie from 'notie';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.sass']
})
export class PersonFormComponent implements OnInit {

  public URL_PREVIEW: any = "../../../assets/img/user.svg";
  private file;

  person: Person = new Person();
  user: string = '';
  depsv_id: number = -1;

  formPerson: FormGroup;
  formUser: FormGroup;
  listMunicipios: Municipio[] = [];

  constructor(
    private router: Router
  ) {
    this.formPerson = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      fecha_nac: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      genero: new FormControl('', [Validators.required]),
      depsv: new FormControl('', [Validators.required]),
      municipio_id: new FormControl('', [Validators.required])
    });

    this.formUser = new FormGroup({
      username: new FormControl('', [Validators.required]),
      passwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_passwd: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    
  }

  public validateField(field: string, form: FormGroup) {
    const validateField = form.get(field);

    return (!validateField?.valid && validateField?.touched)
    ? 'is-invalid' : validateField?.touched ? 'is-valid' : '';
  }
  public validatePassword(field: string) {
    const validateField = this.formUser.get(field);

    return (!validateField?.valid && validateField?.touched && !validateField.errors?.min)
    ? 'is-invalid' : validateField?.touched ? 'is-valid' : '';
  }

  public sendFormPerson(event: Event) {
    event.preventDefault();

    if(this.formPerson.valid) {
      // Verificar si aun esta permitido tener transacciones al server.
      notie.alert({ 'type': 'success', 'text': 'Datos falsos actualizados :)'});
    }
  }
  public sendFormUser(event: Event) {
    event.preventDefault();

    if(this.formUser.valid) {
      // Verificar si aun esta permitido tener transacciones al server.
      notie.alert({ 'type': 'success', 'text': 'Datos falsos actualizados :)'});
    }
  }

  public previewPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.URL_PREVIEW = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
      this.file = event.target.files[0];
    }
  }

}
