export interface cargaIdPanelPruebas {
    ok:                boolean;
    listapruebas: listapruebas;
}

export interface listapruebas {
      id: number;
      CODIGO: string;
      NOMBRE: string;
      CATEGORIA: string;
      TIEMPO: number;
      VALOR: number;
      favorite: null;
      ESTADO: number;
      USUARIO_ID: null;
      CREATEDBY: null;
      UPDATEDBY: null;
      DELETEDBY: null;
      createdAt: Date;
      updatedAt: Date;
      itempruebasId: null;
      modeloId: number;
}