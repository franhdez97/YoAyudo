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
