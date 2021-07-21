import { Component, OnInit } from '@angular/core';
import notie from 'notie';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Help } from './shared/model/help.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  image:any;
  file:any;

  constructor() {
    this.form = new FormGroup({
      categoria: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      lugar: new FormControl('', [Validators.required]),
      foto: new FormControl('', []),
      importancia: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length > 0) {//Identifica si hay archivos
      const file = event.target.files[0];
      if (file.type.includes("image")) { //Evaluar si es una imagen
        const reader = new FileReader();
        reader.readAsDataURL(file);
        this.file = file;
      }
    }
  }

  public sendForm(event: Event) {
    event.preventDefault();

    if (this.form.valid) {
      notie.alert({ type: 1, text: 'Reporte falso enviado :)' });
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
}
