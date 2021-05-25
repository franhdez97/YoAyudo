export class Person {
    id?: number;
    nombre: string = '';
    apellido: string = '';
    genero: number = -1;
    foto: string = '';
    fecha_nac: Date = new Date();
    municipio_id: number = -1;
    depsv_id: number = -1; // Esta relacion se crea para obtener el departamento
    username: string = ''; // Esta relacion se crea para obtener usuario

    constructor() {}
}