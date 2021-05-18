import { Component, OnInit } from '@angular/core';
import notie from 'notie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public logout(): void {
    notie.confirm({
      text: '¿Desea cerrar sesión?',
      submitText: 'Confirmar',
      cancelText: 'Cancelar',
      submitCallback: function () {
        notie.alert({ type: 'success', text: "Nos vemos pronto :')"});
      }
    });
  }

}
