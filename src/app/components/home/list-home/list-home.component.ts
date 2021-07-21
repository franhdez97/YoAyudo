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
  }

  showItem(help: Help) {
    this.renderer.setProperty(this.ubicationModal.nativeElement, "innerHTML", help.lugar);
    this.renderer.setProperty(this.photoModal.nativeElement, "src", help.foto);
  }
}