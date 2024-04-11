export class Import {
  constructor(
    public id?: string,
    public ID_PROVEEDOR?: string,
    public MARCA?: string,
    public FECHAPEDIDO?: string,
    public ESTADO?: string,
    public usuarioId?: string,
    public userId?: string,
    public items?: string[],
  ) {}
}

export class items {
  constructor(
    public ID_PRODUCTO: string,
    public CANTIDAD: string,
  ) {}
}
