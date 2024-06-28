export interface Equipos {
    ok?:      boolean;
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
        id?:          string;
        NOMBRE?:      string;
        CATEGORIA?:   string;
        USUARIO_ID?:  null;
        MARCA_ID?:    number;
        MODELO_ID?:   null;
        SERIE?:       string;
        ESTADO?:      string;
        createdAt?:   Date;
        updatedAt?:   Date;
        marcaId?:     number;
        modeloId?:    null;
        categoriaId?: number;
        categoria?:   Categoria;
        marca?:       Categoria;
    }
    
    export interface Categoria {
        id?:         number;
        NOMBRE?:     string;
        USUARIO_ID?: null;
        ESTADO?:     number;
        createdAt?:  Date;
        updatedAt?:  Date;
    }