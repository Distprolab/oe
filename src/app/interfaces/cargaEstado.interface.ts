export interface Estados {
    ok?:    boolean;
    estado?: Estado[];
}

export interface Estado{
    id?:        number;
    NOMBRE?:    string;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
