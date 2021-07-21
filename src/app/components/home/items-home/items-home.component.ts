import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Help } from 'src/app/shared/model/help.model';
import notie from 'notie';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.sass']
})
export class ItemsHomeComponent implements OnInit {

  @Input() help: Help = new Help({});
  @Output() delete: EventEmitter<Help> = new EventEmitter();
  @Output() detail: EventEmitter<Help> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // Para las peticiones de ayuda
  public answerHelp(): void {
    notie.input({
      text: 'Ingresa una respuesta (es opcional)',
      submitText: 'Enviar',
      cancelText: 'Cancelar',
      type: 'text',
      placeholder: 'Ej: Ya vamos en camino',
      submitCallback: (res) => {
        try {
          notie.alert({ type: 1, text: 'Haz respondido a esta petición'});
          this.delete.emit(this.help);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  public ignoreHelp(): void {
    notie.confirm({
      text: '¿Realmente desea ignorar este reporte?',
      submitText: 'Confirmar',
      cancelText: 'Mejor no',
      submitCallback: () => {
        try {
          notie.alert({ type: 'info', text: 'Reporte ignorado'});
          this.delete.emit(this.help);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  public showHelp(): void {
    this.detail.emit(this.help);
  }

}
