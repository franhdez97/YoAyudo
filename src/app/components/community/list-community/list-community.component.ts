import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Report } from 'src/app/shared/model/report.model';
import { CommunityService } from 'src/app/shared/services/community.service';
import { LoginService } from 'src/app/shared/services/login.service';
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

  constructor(
    private loginServ: LoginService,
    private communityServ: CommunityService
  ) {
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
    const munsv = this.loginServ.SESSION?.m_token;
    if(munsv && munsv != -1) {
      this.communityServ.getReports(munsv).subscribe(
        result => {
          this.listCommunity = result;
        },
        error => {
          notie.alert({ 'type': 'error', 'text': 'No pudimos conectar con el servidor, intente luego' });
        }
      );
    }
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if(this.formReport.valid) {
      this.loginServ.getUser();
      if(this.loginServ.SESSION?.u_token && this.loginServ.SESSION?.u_token != -1) {
        const report = new Report(this.formReport.value);
        report.fecha_hora = new Date();
        report.municipio_id = this.loginServ.SESSION.m_token;
        report.usuario_id = this.loginServ.SESSION.u_token;

        this.communityServ.addReport(report).subscribe(
          result => {
            if(result.toString() === "OK") {
              this.formReport.reset();
              notie.alert({ 'type': 'success', 'text': 'Reporte enviado' });
              this.getReports();
            }
            else {
              notie.alert({ 'type': 'error', 'text': 'No pudimos procesar su reporte en este momento' });
            }
          },
          error => {
            notie.alert({ 'type': 'error', 'text': 'No pudimos conectar con el servidor, intente luego' });
          }
        );
      }
    }
  }

}
