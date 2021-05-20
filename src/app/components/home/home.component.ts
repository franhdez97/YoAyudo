import { Component, OnInit } from '@angular/core';
import notie from 'notie';
import { Help } from 'src/app/shared/model/help.model';
import { HelpService } from 'src/app/shared/services/help.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  public listHelp: Help[] = [];

  constructor(private helpServ: HelpService) {
  }

  ngOnInit(): void {
    // Despues se mandara el rol de usuario...
    this.helpServ.getHelp(1).subscribe(
      value => {
        this.listHelp = value;
      },
      error => {
        console.log(error);
      }
    );
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
}