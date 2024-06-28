export interface stocksPedido {
    ok?: boolean;
    pedidoStock?: pedidoStock[];
  }
  
  export interface pedidoStock {
    id?: number;
    AREA?: number;
    MARCA?: number;
    FECHAPEDIDOSTOCK?: Date;
    ESTADO?: number;
    createdAt?: Date;
    updatedAt?: Date;
    usuarioId?: number;
    userId?: number;
    items?: Item[];
    user?: User;

    clientes?: Clientes;
    marcas?: Marcas;
  }
  
  export interface Item {
    ID_PRODUCTO?: number;
    CANTIDAD?: number;
    product?: Product | null;
  }
  
  export interface User {
    doctor?: string;
  }
  
  export interface Product {
    NOMBRE?: string;
  }
  export interface Clientes {
    NOMBRE?: string;
  }
  
  export interface Marcas {
    NOMBRE?: string;
  }
  