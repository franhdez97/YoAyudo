import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Help } from 'src/app/shared/model/help.model';
import { HelpService } from 'src/app/shared/services/help.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './list-home.component.html',
  styleUrls: ['./list-home.component.sass']
})
export class ListHomeComponent implements OnInit {
  public listHelp: Help[] = [];
  
  public page: number = 1;

  @ViewChild("ubicationModal") ubicationModal!: ElementRef;
  @ViewChild("photoModal") photoModal!: ElementRef;

  constructor(
    private helpServ: HelpService,
    private loginServ: LoginService,
    private renderer: Renderer2
  ) {
  }

  deleteItem(value: Help) {
    this.listHelp = this.listHelp.filter(x => x !== value); // Eliminar listado
  }

  ngOnInit(): void { 
    // Si el rol es  0 (admin), cargara de la tabla mencion (para tener todas las ayudas disponibles)
    // Si el rol es 1 (cliente), cargara las alertas asociadas a ese usuario.

    if(this.loginServ.SESSION?.u_token && this.loginServ.SESSION?.u_token != undefined) {
      this.helpServ.getHelp({
          role: this.loginServ.SESSION?.access,
          u_token: this.loginServ.SESSION?.u_token
      }).subscribe(
        value => {
          this.listHelp = value;
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  showItem(help: Help) {
    this.renderer.setProperty(this.ubicationModal.nativeElement, "innerHTML", help.lugar);
    this.renderer.setProperty(this.photoModal.nativeElement, "src", help.foto);
  }
}