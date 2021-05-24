import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Help } from 'src/app/shared/model/help.model';
import notie from 'notie';
import { LoginService } from 'src/app/shared/services/login.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-items-home',
  templateUrl: './items-home.component.html',
  styleUrls: ['./items-home.component.sass']
})
export class ItemsHomeComponent implements OnInit {

  @Input() help: Help = new Help({});
  @Output() delete: EventEmitter<Help> = new EventEmitter();
  @Output() detail: EventEmitter<Help> = new EventEmitter();

  constructor(
    public loginServ: LoginService
  ) { }

  ngOnInit(): void {
  }

  deleteCard = () => {
    try {
      notie.alert({ type: 'info', text: 'Reporte ignorado'});
      this.delete.emit(this.help);
    } catch (error) {
      console.log(error);
    }
  };

  responseHelp = () => {
    //Aqui se llamara al metodo para enviar respuesta
    notie.alert({ type: 1, text: 'Haz respondido a esta petición'});
    this.delete.emit(this.help);
  }

  // Para las peticiones de ayuda
  public answerHelp(): void {
    notie.input({
      text: 'Ingresa una respuesta (es opcional)',
      submitText: 'Enviar',
      cancelText: 'Cancelar',
      type: 'text',
      placeholder: 'Ej: Ya vamos en camino',
      submitCallback: this.responseHelp
    });
  }
  public ignoreHelp(): void {
    notie.confirm({
      text: '¿Realmente desea ignorar este reporte?',
      submitText: 'Confirmar',
      cancelText: 'Mejor no',
      submitCallback: this.deleteCard
    });
  }

  public showHelp(): void {
    this.detail.emit(this.help);
  }

}
