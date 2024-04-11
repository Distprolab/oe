export interface Equipos {
    ok?:      boolean;
    equipos?: Equipo[];
}

export interface Equipo {
    id?:        number;
    NOMBRE?:    string;
    CATEGORIA?: null;
    ESTADO?:    number;
    createdAt?: Date;
    updatedAt?: Date;
}
