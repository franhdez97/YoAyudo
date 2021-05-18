import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import notie from 'notie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public form: FormGroup;
  
  constructor() {
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required]),
      references: new FormControl('', [Validators.required]),
      photo: new FormControl('', []),
      importance: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  // Para las peticiones de ayuda
  public answerHelp(): void {
    notie.input({
      text: 'Ingresa una respuesta (es opcional)',
      submitText: 'Enviar',
      cancelText: 'Cancelar',
      cancelCallback: function (value) {
      },
      submitCallback: function (value) {
        notie.alert({ type: 1, text: 'Haz respondido a esta petición'});
      }, 
      type: 'text',
      placeholder: 'Ej: Ya vamos en camino'
    });
  }
  public ignoreHelp(): void {
    notie.confirm({
      text: '¿Realmente desea ignorar este reporte?',
      submitText: 'Confirmar',
      cancelText: 'Mejor no',
      submitCallback: function () {
        notie.alert({ type: 'info', text: 'Reporte ignorado'});
      }
    });
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      const value = this.form.value;
      this.form.reset();

      notie.alert({ type: 1, text: 'Reporte enviado' });
    } else {
      this.form.markAllAsTouched();
    }
  }

}