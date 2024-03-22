/* export interface Pruebas {
    ok:           boolean;
    TestName?:           string;
    listapruebas?: RegisterDateCount[];
}

export interface RegisterDateCount {
    TestName?:           string;


    RegisterDateCounts?:string[];
    RegisterDate?: string;
    Count?:        number;
} */

export interface Pruebas {
  ok: boolean;
  listapruebas?: RegisterDateCount[];
}

export interface RegisterDateCount {
  TestName: string;
  RegisterDateCounts: RegisterDateCount[];
}

export interface RegisterDateCount {
  RegisterDate: string;
  Count: number;
}
