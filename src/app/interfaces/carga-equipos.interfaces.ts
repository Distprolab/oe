export interface Equipos {
    ok?: boolean;
    equipos?: Equipo[];
}

/* export interface Equipo {
    id?:        string;
    NOMBRE?:    string;
    categoria?: Categoria;
    USUARIO_ID?: number;
    MARCA_ID?:   number;
    MODELO_ID?:  number;
    SERIE?:     string;
    ESTADO?:    string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Categoria {
    id?:        number;
    nombre?:    string;
    usuarioID?: null;
    estado?:    number;
    createdAt?: Date;
    updatedAt?: Date;
} */

export interface Equipo {
    id?: string;
    NOMBRE?: string;
    CATEGORIA?: null;
    USUARIO_ID?: null;
    MARCA_ID?: null;
    MODELO_ID?: null;
    SERIE?: string;
    ESTADO?: string;
    createdAt?: Date;
    updatedAt?: Date;
    marcaId?: number;
    modeloId?: number;
    estadoId?: number;
    ubicacionId?: number;
    modelo?: Estado;
    marca?: Estado;
    ubicacion?: Estado;
    estado?: Estado;
    expanded?: boolean;
    acc?: Acc[];
}
export interface Acc {
    id?: number;
    ACCMODELO_ID?: string;
    SERIE?: string;
    USUARIO_ID?: null;
    ESTADO?: number;
    createdAt?: Date;
    updatedAt?: Date;
    equipoId?: number;
}
export interface Estado {
    id?: number;
    NOMBRE?: string;
    USUARIO_ID?: null;
    ESTADO?: number;
    createdAt?: Date;
    updatedAt?: Date;
}