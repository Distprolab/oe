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
        { titulo: 'Crear Usuario', url: 'usuario', roles: ['ADMIN', 'TICS'] },

        {
          titulo: 'Lista de Usuario',
          url: 'usuarios',
          roles: ['ADMIN', 'TICS'],
        },
      ],
    },
    {
      titulo: 'ORDENES',
      icono: 'right fas fa-angle-left',
      submenu: [
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
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte produccion',
          url: 'reporte-produccion',
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte Qc',
          url: 'reporte-qc',
          roles: ['ADMIN', 'CALIDAD'],
        },
        {
          titulo: 'Reporte Micro',
          url: 'report-micro',
          roles: ['ADMIN', 'MICRO'],
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
          roles: ['ADMIN', 'COMPRAS'],
        },
        {
          titulo: 'consulta-compras',
          url: 'consulta-compras',
          roles: ['ADMIN', 'COMPRAS'],
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
          roles: ['ADMIN', 'MICRO', 'DOCTOR', 'OPERADOR', 'MEDICO'],
        },
      ],
    },
    {
      titulo: 'IMPORTACION',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Solicitud de Pedido',
          url: 'pedido-importacion/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Pedidos',
          url: 'pedidos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Total pedidos',
          url: 'total-pedidos',
          roles: ['ADMIN', 'IMPORT'],
        },
      ],
    },

    {
      titulo: 'PRODUCTOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'PRODUCTOS',
          url: 'productos',
          roles: ['ADMIN', 'IMPORT'],
        },
      ],
    },

    {
      titulo: 'MANTENIMIENTOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'MARCA',
          url: 'marca',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'CLIENTE',
          url: 'cliente',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'PANEL PRUEBAS',
          url: 'panelPruebas',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'IMPRESORA',
          url: 'impresora',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Equipos',
          url: 'equipos',
          roles: ['ADMIN', 'COMPRAS'],
        },
      ],
    },
    {
      titulo: ' INVENTARIO',
      icono: 'right fas fa-angle-left',
      submenu:
   [ {
      titulo:'Stock',
      url:'stock',
      roles:['ADMIN']
    }]}
  ];

  getMenuWithPermissions(): any[] {
    const userRoles = this.usuario.rol;
    console.log(`**********ROL DE SERVICES***************`, userRoles);

    return this.menu.filter((item) => {
      if (item.submenu) {
        item.submenu = item.submenu.filter((subitem) => {
          if (subitem.roles) {
            return subitem.roles.some((role) => userRoles.includes(role));
          } else {
            return true;
          }
        });

        return item.submenu.length > 0;
      } else {
        return true;
      }
    });
  }
}
