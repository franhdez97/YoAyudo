export class Help {
    id: number;
    descripcion: string;
    fecha_hora: Date;
    lugar: string;
    estado: number;
    foto: string;
    respuesta: string;
    usuario_id: number;
    municipio_id: number;
    categoria: number;
    importancia: number;

    constructor(help: any) {
            this.id = help?.id;
            this.descripcion = help?.descripcion;
            this.fecha_hora = help?.fecha_hora;
            this.lugar = help?.lugar;
            this.estado = help?.estado;
            this.foto = help?.foto;
            this.respuesta = help?.respuesta;
            this.usuario_id = help?.usuario_id;
            this.municipio_id = help?.municipio_id;
            this.categoria = help?.categoria;
            this.importancia = help?.importancia;
    }
}