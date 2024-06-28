export interface Inventario {
    ok:    boolean;
    stock: Stock[];
}

export interface Stock {
    cantidad:   string;
    referencia: string;
    lote:       string;
    caducidad:  string;
}