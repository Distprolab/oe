import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../models/usuario.module';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private usuario: Usuario;
  constructor(private usuarioService: UsuarioService) {
    this.usuario = usuarioService.usuario;
  }

  menu: any[] = [
    {
      titulo: ' USUARIOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        { titulo: 'Crear Usuario', url: 'usuario', roles: ['ADMIN'] },

        { titulo: 'Lista de Usuario', url: 'usuarios', roles: ['ADMIN'] },
      ],
    },
    {
      titulo: 'ORDENES',
      icono: 'right fas fa-angle-left',
      submenu: [
        /*   {titulo:'Crear Ordenes',url:'orden/Nuevo',roles: ['ADMIN','DOCTOR','OPERADOR']}, */
        {
          titulo: 'Crear Orden Manual',
          url: 'orden-manual',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR'],
        },
        {
          titulo: 'Lista de Ordenes',
          url: 'ordenes',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR'],
        },
      ],
    },

    {
      titulo: 'AGENDAMIENTO',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Agendamiento',
          url: 'agendamiento',
          roles: ['ADMIN', 'RECEPCION'],
        },
        {
          titulo: 'Agendados',
          url: 'agendados',
          roles: ['ADMIN', 'RECEPCION'],
        },

        {
          titulo: 'Agendamiento manual',
          url: 'agendamiento-manual',
          roles: ['ADMIN', 'RECEPCION'],
        },
      ],
    },

    {
      titulo: 'REPORTES ESTADISTICOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Reporte pacientes',
          url: 'registro-Pacientes',
          roles: ['ADMIN', 'SUPERVISOR'],
        },
        {
          titulo: 'Reporte produccion',
          url: 'reporte-produccion',
          roles: ['ADMIN', 'SUPERVISOR'],
        },
        {
          titulo: 'Reporte Qc',
          url: 'reporte-qc',
          roles: ['ADMIN', 'SUPERVISOR'],
        },
        {
          titulo: 'Reporte Micro',
          url: 'report-micro',
          roles: ['ADMIN', 'SUPERVISOR'],
        },
      ],
    },

    {
      titulo: 'MUESTRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Lista muestra',
          url: 'muestra',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'Muestras Aceptadas',
          url: 'muestras',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'Muestras rechazadas',
          url: 'muestras-rechazo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'Muestras actualizar',
          url: 'muestras-actualización',
          roles: ['ADMIN', 'OPERADOR'],
        },
      ],
    },
    {
      titulo: 'COMPRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Compras',
          url: 'compras',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR', 'MEDICO'],
        },
      ],
    },
    {
      titulo: 'CONSULTA DE RESULTADOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Consulta Web',
          url: 'consulta-web',
          roles: ['ADMIN', 'SUPERVISOR', 'DOCTOR', 'OPERADOR', 'MEDICO'],
        },
      ],
    },
  ];

  getMenuWithPermissions(): any[] {
    const userRoles = this.usuario.rol;
    console.log(`**********ROL DE SERVICES***************`, userRoles);

    return this.menu.filter((item) => {
      //console.log(`existe rol`,item.titulo)

      if (item.submenu) {
        item.submenu = item.submenu.filter((subitem) => {
          if (subitem.roles) {
            return subitem.roles.some((role) => userRoles.includes(role));
          } else {
            return true; // Si no se especifican roles, se muestra para todos los usuarios
          }
        });

        return item.submenu.length > 0; // Mostrar el elemento del menú solo si tiene submenú después de aplicar el filtro
      } else {
        return true; // Si no hay submenú, mostrar el elemento del menú sin restricciones
      }
    });
  }
}
