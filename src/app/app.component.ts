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
  
  constructor(
    private helpServ: HelpService,
    public loginServ: LoginService
  ) {
    this.form = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required]),
      lugar: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      importancia: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      // Los demas datos se rellenan aparte
      const help = new Help(this.form.value);
      help.estado = 0;
      help.respuesta = "";
      help.foto = ""; // Se debe subir la foto con angular o nodejs antes para verificar y obtener la ruta
      help.fecha_hora = new Date();
      help.usuario_id = this.loginServ.SESSION?.u_token;
      help.municipio_id = this.loginServ.SESSION.m_token;

      // Internamente el envia una alerta a cada admin con este municipio
      this.helpServ.addReport(help).subscribe(
        result => {
          if(result.toString() === "OK") {
            notie.alert({ type: 1, text: 'Reporte enviado' });
            this.form.reset();
          }
          else {
            notie.alert({ type: 'error', text: 'Tuvimos un problema, intente luego' });
          }
        },
        error => {
          console.log(error);
          notie.alert({ type: 'error', text: 'No pudimos conectar con el servidor' });
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
}
