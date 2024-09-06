export interface Pruebas {
  ok:           boolean;
  listapruebas: Listaprueba[];
}

export interface Listaprueba {
  id:        number;
  CODIGO:    string;
  NOMBRE:    string;
  CATEGORIA: string;
  TIEMPO:    number;
  VALOR:     number;
  ESTADO:    number;
  createdAt: Date;
  updatedAt: Date;
  modelo:        Modelo;
}
export interface Modelo {
  id:         number;
  NOMBRE:     string;
  USUARIO_ID: null;
  ESTADO:     number;
  createdAt:  Date;
  updatedAt:  Date;
}