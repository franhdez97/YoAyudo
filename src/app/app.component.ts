import { Component, OnInit } from '@angular/core';
import notie from 'notie';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelpService } from './shared/services/help.service';
import { Help } from './shared/model/help.model';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  image:any;
  file:any;

  constructor(
    private helpServ: HelpService,
    public loginServ: LoginService
  ) {
    this.form = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      lugar: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      importancia: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {//Identifica si hay archivos
      const file = event.target.files[0];
      if (file.type.includes("image")) { //Evaluar si es una imagen
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.file = file;
      }
    }
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      // Los demas datos se rellenan aparte
      const help = new Help(this.form.value);
      help.estado = 0;
      help.foto = '';
      help.respuesta = "";
      help.fecha_hora = new Date();
      help.usuario_id = this.loginServ.SESSION?.u_token;
      help.municipio_id = this.loginServ.SESSION.m_token;

      // Para la foto
      const formHelp = new FormData();//Crea un formulario
      formHelp.append(
        'help_photo',
        this.file ? this.file : "",
        this.file?.name ? this.file.name?.replaceAll(/ /g,'_') : ""
      );//Asigna el campo "help_photo" al input file
      formHelp.append('estado','0');
      formHelp.append('categoria',this.form.value.categoria);
      formHelp.append('descripcion',this.form.value.descripcion);
      formHelp.append('lugar',this.form.value.lugar);
      formHelp.append('importancia',this.form.value.importancia);

      formHelp.append('respuesta','');
      formHelp.append('fecha_hora',new Date().toString());
      formHelp.append('usuario_id',this.loginServ.SESSION.u_token.toString());
      formHelp.append('municipio_id',this.loginServ.SESSION.m_token.toString());

      this.helpServ.addReport(formHelp).subscribe(
        resultHelp => {
          if (resultHelp.toString() === "OK") {
            notie.alert({ type: 1, text: 'Reporte enviado' });
            this.form.reset();
          }
          else {
            notie.alert({ type: 'error', text: 'Tuvimos un problema, intente luego' });
          }
        },
        error => {
          notie.alert({ type: 'error', text: 'No pudimos conectar con el servidor' });
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
