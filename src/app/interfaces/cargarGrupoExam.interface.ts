export interface GrupoExam {
    ok:            boolean;
    listaperfiles: Listaperfile[];
}

export interface Listaperfile {
    id:          number;
    codigo:      number;
    nombre:      string;
    tipogrupo:   number;
    estado:      boolean;
    createdAt:   Date;
    updatedAt:   Date;
    itempruebas: Itemprueba[];
}

export interface Itemprueba {
    id:            number;
    pruebaId:      number;
    fecha:         Date;
    estado:        boolean;
    createdAt:     Date;
    updatedAt:     Date;
    perfilId:      number;
    perfilesId:    null;
    panelpruebaId: number;
    panelprueba:   Panelprueba;
}

export interface Panelprueba {
    id:            number;
    CODIGO:        string;
    NOMBRE:        string;
    CATEGORIA:     string;
    TIEMPO:        number;
    VALOR:         number;
    favorite:      null;
    ESTADO:        number;
    createdAt:     Date;
    updatedAt:     Date;
    itempruebasId: null;
}
