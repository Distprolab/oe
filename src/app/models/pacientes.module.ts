export class Pacientes {
  constructor(
    //public diffgrID:       string,
    // public msdataRowOrder: string,
    public PA_ID1: string,
    public PA_FIRSTNAME: string,
    public PA_LASTNAME: string,
    public PA_SESURNAME: string,

    //  EDAD:EDAD,
    public PA_SEX,

    public id: string,
    public TIPOIDENTIFICADOR: string,
    public CODTIPOORDEN: string,
    public TIPOORDEN: string,
    public CODPROCEDENCIA: string,
    public PROCEDENCIA: string,
    public CODSERVICIO: string,
    public SERVICIO: string,
    public CODDOCTOR: string,
    public DOCTOR: string,
    public IMPRESORA: string,
    public NUMEROORDEN: string,
    public FECHAORDEN: string,
    public HORAORDEN: string,
    //public TIPOIDENTIFICADOR: string,
    public IDENTIFICADOR: string,
    public NOMBRES: string,
    public APELLIDO: string,
    public SEGUNDOAPELLIDO: string,
    public FECHANACIMIENTO: string,
    public SEXO: string,
    public OBSERVACIONES: string,
    public ESTADO: string,
  ) {}
}