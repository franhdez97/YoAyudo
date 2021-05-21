export class User {
    id?: number;
    username: string;
    passwd: string;
    rol: number;
    persona_id: number;

    constructor() {
        this.username = '';
        this.passwd = '';
        this.rol = 1;
        this.persona_id = -1;
    }
}