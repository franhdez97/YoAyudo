import { Component, OnInit } from '@angular/core';
import { InterceptorService } from '../services/interceptor.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.sass']
})
export class SpinnerComponent {
  isLoading = this.spinnerServ.isLoading$;

  constructor(private spinnerServ: InterceptorService) { }

}
