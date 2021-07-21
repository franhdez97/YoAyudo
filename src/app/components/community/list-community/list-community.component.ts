import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/shared/model/report.model';
import notie from 'notie';

@Component({
  selector: 'app-list-community',
  templateUrl: './list-community.component.html',
  styleUrls: ['./list-community.component.sass']
})
export class ListCommunityComponent implements OnInit {

  listCommunity: Report[] = [];
  formReport: FormGroup;
  page: number = 1;

  constructor() {
    this.formReport = new FormGroup({
      titulo: new FormControl('', [Validators.required]),
      lugar: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)])
    });
  }

  ngOnInit(): void {
    this.getReports();
  }

  private getReports() {
    this.listCommunity = [
      {
        id: 1,
        descripcion: "Hay una fuga de agua en mi casa",
        lugar: "San Vicente",
        fecha_hora: new Date(),
        usuario_id: 19,
        municipio_id: 257,
        titulo: "Inundación"
      },
      {
        id: 2,
        descripcion: "Alguien choco con los vecinos",
        lugar: "San Salvador",
        fecha_hora: new Date(),
        usuario_id: 19,
        municipio_id: 257,
        titulo: "Choque de autos"
      }
    ];
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if(this.formReport.valid) {
      this.formReport.reset();
      notie.alert({ 'type': 'success', 'text': 'Reporte enviado' });
      //agregar
    }
  }

}
