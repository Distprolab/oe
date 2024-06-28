export class PedidoStock {
    constructor(
      public AREA: string,
    
    //  public MARCA: number,
      public itemstock: Item[],
      public id: number,
    ) {}
  }
  
  export interface Item {
    ID_PRODUCTO: number;
    product: Product; // Utilizamos el tipo 'Product' aquí
    CANTIDAD: number;
    ENTREGADO:Number;
  }
  
  export class Product {
    constructor(
      public REFERENCIA: string,
      public NOMBRE: string,
      public CATEGORIA: string,
      public UNIDAD: string,
      public GENERACION: string,
    ) {}
  }