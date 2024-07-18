export interface Ubicaciones {
    ok?:    boolean;
    ubicacion?: Ubicacion[];
}

export interface Ubicacion{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
