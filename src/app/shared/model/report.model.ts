export class Report {
    id: number;
    descripcion: string;
    lugar: string;
    fecha_hora: Date;
    usuario_id: number;
    municipio_id: number;

    constructor(report) {
        this.id = report?.id;
        this.descripcion = report?.descripcion;
        this.lugar = report?.lugar;
        this.fecha_hora = report?.fecha_hora;
        this.usuario_id = report?.usuario_id;
        this.municipio_id = report?.municipio_id;
    }
}