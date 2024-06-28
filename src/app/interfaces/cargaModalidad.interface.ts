export interface Modalidad {
    ok?:    boolean;
    modalidad?: Modalidad[];
}

export interface Modalidad{
    id:        number;
    NOMBRE:    string;
    usuarioID: number;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
}