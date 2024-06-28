export interface Modelos {
    ok?:    boolean;
    modelo?: Modelo[];
}

export interface Modelo{
    id?:        string;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
