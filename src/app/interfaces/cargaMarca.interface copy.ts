export interface Marcas {
    ok?:    boolean;
    marcas?: Marca[];
}

export interface Marca{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
