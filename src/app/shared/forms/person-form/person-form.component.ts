import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Municipio } from '../../model/municipio.model';
import { Person } from '../../model/person.model';
import { LoginService } from '../../services/login.service';
import { MunicipioService } from '../../services/municipio.service';
import { ProfileService } from '../../services/profile.service';
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
    public loginServ: LoginService,
    private profileServ: ProfileService,
    private munServ: MunicipioService,
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
    this.loginServ.getLocalStorage();
    
    if(this.loginServ.SESSION?.p_token != undefined && this.loginServ.SESSION?.p_token !== -1) {
      this.profileServ.getPersonById(this.loginServ.SESSION?.p_token).subscribe(
        data => {
          this.URL_PREVIEW = data.foto ? data.foto : this.URL_PREVIEW;
          this.depsv_id = data?.depsv_id;
          this.person = data;
          this.user = data?.username;

          // Cargar municipios
          this.municipios(this.depsv_id);
          // aqui se carga el formulario (si esta con datos) ...
          this.loadForm();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  private loadForm() {
    const date = new Date(this.person?.fecha_nac);
    
    const year = date.getFullYear();
    const month = (date.getMonth()+1) < 10 ? `0${(date.getMonth()+1)}`: (date.getMonth()+1);
    const day = (date.getDate()+1) < 10 ? `0${(date.getDate()+1)}`: (date.getDate()+1);

    const new_date = `${year}-${month}-${day}`;

    this.formPerson = new FormGroup({
      nombre: new FormControl(this.person?.nombre, [Validators.required]),
      apellido: new FormControl(this.person?.apellido, [Validators.required]),
      fecha_nac: new FormControl(new_date, [Validators.required]),
      foto: new FormControl('', []),
      genero: new FormControl(`${this.person?.genero}`, [Validators.required]),
      depsv: new FormControl(this.person?.depsv_id, [Validators.required]),
      municipio_id: new FormControl(this.person?.municipio_id, [Validators.required])
    });

    this.formUser = new FormGroup({
      username: new FormControl(this.user, [Validators.required]),
      passwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
      re_passwd: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
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
      this.loginServ.getUser();

      if(this.loginServ.SESSION?.u_token && this.loginServ.SESSION?.u_token != undefined) {
        this.formPerson.value.id = this.loginServ.SESSION?.p_token; // Para asignar el valor del id a actualizar
        // Para la foto
        const formPerson = new FormData();//Crea un formulario
        formPerson.append(
          'foto',
          this.file ? this.file : "",
          this.file?.name ? this.file.name?.replaceAll(/ /g,'_') : ""
        );//Asigna el campo "help_photo" al input file
        formPerson.append('nombre',this.formPerson.value.nombre);
        formPerson.append('apellido',this.formPerson.value.apellido);
        formPerson.append('depsv',this.formPerson.value.depsv);
        formPerson.append('fecha_nac',this.formPerson.value.fecha_nac);
        formPerson.append('genero',this.formPerson.value.genero);
        formPerson.append('id',this.formPerson.value.id);
        formPerson.append('municipio_id',this.formPerson.value.municipio_id);

        this.profileServ.updatePerson(formPerson).subscribe(
          result => {
            notie.alert({ 'type': 'success', 'text': 'Datos personales actualizados'});
          },
          error => {
            notie.alert({ 'type': 'error', 'text': 'Lo sentimos, no pudimos contactar con el servidor'});
          }
        );
      }
    }
  }
  public sendFormUser(event: Event) {
    event.preventDefault();

    if(this.formUser.valid) {
      // Verificar si aun esta permitido tener transacciones al server.
      this.loginServ.getUser();

      if(this.loginServ.SESSION?.u_token && this.loginServ.SESSION?.u_token != -1) {
        this.formUser.value.id = this.loginServ.SESSION?.u_token; // Para asignar el valor del id a actualizar
        
        this.profileServ.updateUser(this.formUser.value).subscribe(
          result => {
            notie.alert({ 'type': 'success', 'text': 'Datos de usuario actualizado'});
            this.loginServ.getUser();
          },
          error => {
            notie.alert({ 'type': 'error', 'text': 'Lo sentimos, no pudimos contactar con el servidor'});
          }
        );
      }
      else {
        if(this.formPerson.valid && this.formUser.valid) {
          // Para la foto
          const formUser = new FormData();//Crea un formulario
          formUser.append(
            'foto',
            this.file ? this.file : "",
            this.file?.name ? this.file.name?.replaceAll(/ /g,'_') : ""
          );//Asigna el campo "help_photo" al input file
          formUser.append('nombre',this.formPerson.value.nombre);
          formUser.append('apellido',this.formPerson.value.apellido);
          formUser.append('depsv',this.formPerson.value.depsv);
          formUser.append('fecha_nac',this.formPerson.value.fecha_nac);
          formUser.append('genero',this.formPerson.value.genero);
          formUser.append('municipio_id',this.formPerson.value.municipio_id);
          formUser.append('username',this.formUser.value.username);
          formUser.append('passwd',this.formUser.value.passwd);
          formUser.append('rol',"1");

          const userExists: User = new User();
          userExists.username = this.formUser.value.username;

          this.profileServ.existsUser(userExists).subscribe(
            result => {
              if(result.toString() === "") {
                this.profileServ.addPerson(formUser).subscribe(
                  result => {
                    notie.alert({ 'type': 'success', 'text': 'Usuario creado'});
                    this.router.navigate(['']);
                  },
                  error => {
                    notie.alert({ 'type': 'error', 'text': 'Lo sentimos, no pudimos contactar con el servidor'});
                  }
                );
              }
              else {
                notie.alert({ 'type': 'warning', 'text': 'El usuario ya existe'});
              }
            },
            error => {}
          )
        }
      }
    }
  }

  public municipios(value) {
    this.munServ.getMunicipios(value ? value : -1).subscribe(
      result => {
        this.listMunicipios = result;
      },
      error => {
        notie.alert({ 'type': 'error', 'text': 'Lo sentimos, no pudimos obtener los datos en este momento'});
      }
    );
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
