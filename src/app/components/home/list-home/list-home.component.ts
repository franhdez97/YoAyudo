import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Help } from 'src/app/shared/model/help.model';

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
    private renderer: Renderer2
  ) {
  }

  deleteItem(value: Help) {
    this.listHelp = this.listHelp.filter(x => x !== value); // Eliminar listado
  }

  ngOnInit(): void { 
    //add helps
    this.listHelp = [
      {
        id: 1,
        descripcion: "ES UNA EMERGENCIA, necesito ayuda lo mas pronto posible.",
        fecha_hora: new Date(),
        lugar: "Cerca del Mercado Municipal",
        estado: 0,
        foto: "",
        respuesta: "",
        municipio_id: 257,
        categoria: -1,
        importancia: 1,
        usuario_id: 19
      },
      {
        id: 2,
        descripcion: "Un perro me mordio",
        fecha_hora: new Date(),
        lugar: "Cerca de la cancha de futbol",
        estado: 0,
        foto: "",
        respuesta: "La ayuda ya va en camino",
        municipio_id: 257,
        categoria: -1,
        importancia: 1,
        usuario_id: 19
      }
    ];
  }

  showItem(help: Help) {
    this.renderer.setProperty(this.ubicationModal.nativeElement, "innerHTML", help.lugar);
    this.renderer.setProperty(this.photoModal.nativeElement, "src", help.foto);
  }
}