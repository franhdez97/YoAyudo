import { Component, OnInit } from '@angular/core';
import notie from 'notie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Paa las peticiones de ayuda
  public answerHelp(): void {
    notie.input({
      text: 'Ingresa una respuesta (es opcional)',
      submitText: 'Enviar',
      cancelText: 'Cancelar',
      cancelCallback: function (value) {
      },
      submitCallback: function (value) {
        notie.alert({ type: 1, text: 'Haz respondido a esta peticion'});
      }, 
      type: 'text',
      placeholder: 'Ej: Ya vamos en camino'
    });
  }
  public ignoreHelp(): void {
    notie.alert({ type: 'info', text: 'Petición ignorada' })
  }

}
