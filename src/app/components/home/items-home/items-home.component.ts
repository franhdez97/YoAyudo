import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { Help } from 'src/app/shared/model/help.model';
import notie from 'notie';
import { LoginService } from 'src/app/shared/services/login.service';
import { DOCUMENT } from '@angular/common';
import { HelpService } from 'src/app/shared/services/help.service';

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
    public loginServ: LoginService,
    private helpServ: HelpService
  ) { }

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
          const help = {
            estado: 1,
            id: this.help.id,
            respuesta: res ? res : 'Hemos leido tu petición y ha sido tomada en cuenta'
          };

          this.helpServ.updateState(help).subscribe(
            result => {
              if(result.toString() === "OK") {
                notie.alert({ type: 1, text: 'Haz respondido a esta petición'});
                this.delete.emit(this.help);
              }
            },
            error => {
              console.log(error);
            }
          );
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
          const help = {
            estado: -1,
            id: this.help.id,
            respuesta: 'Tu petición ha sido ignorada'
          };

          this.helpServ.updateState(help).subscribe(
            result => {
              if(result.toString() === "OK") {
                notie.alert({ type: 'info', text: 'Reporte ignorado'});
                this.delete.emit(this.help);
              }
            },
            error => {
              console.log(error);
            }
          );
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
