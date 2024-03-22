import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rolee } from 'src/app/models/rol.module';
import { RolService } from 'src/app/services/rol.service';
import { MatPaginator } from '@angular/material/paginator';
/* import { RolService } from 'src/app/services/rol.service';*/
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
//import { ModalIMagenService } from '../../../services/modal-imagen.service';
//import { Usuario } from '../../../interfaces/cargarUsuarios';
import { Usuario } from '../../../models/usuario.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  @Output() total = new EventEmitter();

  public datPasword: Usuario;
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  listaroles: Rolee[] = [];
  public desde: number = 0;
  public page!: number;
  passwordforma!: FormGroup;
  /*  page: number = 0; */
  public cargando: boolean = true;
  constructor(
    private usuarioservice: UsuarioService,
    private listarol: RolService,
    private fb: FormBuilder,
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.listarol.getRol().subscribe((resp) => {
      console.log(resp);
      this.listaroles = resp;
      this.Getusuarios();
    });
    this.Getusuarios();
  }

  crearFormulario() {
    this.passwordforma = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  Getusuarios() {
    this.cargando = true;
    this.usuarioservice.GetUsuarios().subscribe(({ total, usuarios }) => {
      this.totalUsuarios = total;

      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    });
  }

  cambinarPagina(valor: number) {
    this.desde += valor;
    console.log('primer desde', this.desde);
    if (this.desde < 0) {
      this.desde = 0;
      console.log('segundo desde', this.desde);
    } else if (this.desde === this.totalUsuarios) {
      console.log('tercero desde', this.totalUsuarios);
      this.desde -= valor;
      console.log('cuarto desde', this.desde);
    }
    this.Getusuarios();
  }

  actualizarpassword(usuario: Usuario) {
    this.datPasword = usuario;
  }

  UpdateP() {
    console.log(this.datPasword.id);
    const id = this.datPasword.id;
    this.usuarioservice
      .actualizarPassword(id, this.passwordforma.value)
      .subscribe((resp) => {
        Swal.fire({
          icon: 'success',

          titleText: 'Se a cambiado con exito la contrasena',
        });
      });
  }
  eliminarUsuario(usuario: Usuario) {
    console.log('user', usuario);
    if (usuario.id != this.usuarioservice.id) {
      console.log('nuevo', this.usuarioservice.id);
      Swal.fire({
        title: 'Desactivar usuario?',
        text: `Esta seguro de desactivar al ${usuario.doctor}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        confirmButtonText: 'Si desactivar?',
      }).then((result) => {
        if (result.value) {
          this.usuarioservice.eliminarUsuario(usuario).subscribe((resp) => {
            this.Getusuarios();
            Swal.fire(
              'Usuario Desactivado',
              `${usuario.doctor} fue desactivado correctamente`,
              'success',
            );
          });
        }
      });
    } else {
      Swal.fire('Error', 'No puedes desactivar tu mismo usuario', 'error');
    }
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioservice
      .cambiarRole(usuario)
      .subscribe((resp) => console.log(resp));
  }
  buscar(termino: string) {
    return termino.length === 0
      ? (this.usuarios = this.usuariosTemp)
      : this.usuarioservice
          .buscarFiltroUsuario(termino)
          .subscribe((resultados) => {
            this.usuarios = resultados;
          });
  }
  /* 
  nextPage() {
    if (!this.page) {
      this.page += 5;
    }
  }


  prevPage() {
    if (this.page > 0) {
      this.page -= 5;
    }
  } */
}
