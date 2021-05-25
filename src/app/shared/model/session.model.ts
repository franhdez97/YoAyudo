export class Session {
    u_token: number; // Id Usuario
    p_token: number; // Id pesona
    access: number; // Rol
    m_token: number;

    constructor() {
        this.u_token = -1;
        this.p_token = -1; // Id pesona
        this.access = -1; // Rol
        this.m_token = -1;
    }
}