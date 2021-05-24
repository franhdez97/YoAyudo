export class Session {
    u_token: number; // Id Usuario
    p_token: number; // Id pesona
    access: number; // Rol
    user: string;
    m_token: number;

    constructor() {
        this.u_token = -1;
        this.p_token = -1; // Id pesona
        this.access = -1; // Rol
        this.user = '';
        this.m_token = -1;
    }
}