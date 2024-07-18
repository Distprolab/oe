export interface Modelos {
    ok?:    boolean;
    modelo?: Modelo[];
}

export interface Modelo{
    id?:        string;
    NOMBRE?:    string;
    ESTADO?:    number;
    instrumento?: Instrumento[];
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Instrumento {
    id:        number;
    NOMBRE:    string;
    ESTADO:    number;
    createdAt: Date;
    updatedAt: Date;
    modeloId:  number;
}