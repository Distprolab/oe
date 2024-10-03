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

        {
          titulo: 'Lista de Usuario',
          url: 'usuarios',
          roles: ['ADMIN'],
        },
      ],
    },
      {
      titulo: 'ORDENES',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'INGRESO DE ORDENES',
          url: 'ingresordenes',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR'],
        },
        {
          titulo: 'Lista de Ordenes',
          url: 'ordenes',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR'],
          data: { titulo: 'orden' },
        },
        {
          titulo: 'manual',
          url: 'manual/Nuevo',
          roles: ['ADMIN', 'DOCTOR', 'SUPEROPERADOR'],
          data: { titulo: 'manual' },
        },

        {
          titulo: 'carga-ordenes',
          url: 'carga-ordenes',
          roles: ['ADMIN', 'DOCTOR', 'OPERADOR'],
          data: { titulo: 'carga-ordenes' },
        },
      ],
    }, 
    /* 
    {
      titulo: 'AGENDAMIENTO',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Agendamiento',
          url: 'agendamiento',
          roles: ['ADMIN', 'RECEPCION', 'SUPEROPERADOR'],
        },
        {
          titulo: 'Agendados',
          url: 'agendados',
          roles: ['ADMIN', 'RECEPCION', 'SUPEROPERADOR'],
        },

        {
          titulo: 'Agendamiento manual',
          url: 'agendamiento-manual',
          roles: ['ADMIN', 'RECEPCION', 'SUPEROPERADOR'],
        },
      ],
    }, */

    /*  {
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
    }, */
    /*     {
      titulo: 'MUESTRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Lista muestra',
          url: 'muestra',
          roles: ['ADMIN', ''],
        },
        {
          titulo: 'Muestras Aceptadas',
          url: 'muestras',
          roles: ['ADMIN', ''],
        },
        {
          titulo: 'Muestras rechazadas',
          url: 'muestras-rechazo',
          roles: ['ADMIN', ''],
        },
        {l
          titulo: 'Muestras actualizar',
          url: 'muestras-actualización',
          roles: ['ADMIN', ''],
        },
      ],
    }, */
    /*  {
      titulo: 'COMPRAS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'Compras',
          url: 'compras/Nuevo',
          roles: ['ADMIN', 'COMPRAS'],
        },
        {
          titulo: 'consulta-compras',
          url: 'consulta-compras',
          roles: ['ADMIN', 'COMPRAS'],
        },
      ],
    }, 

  /*   {
      titulo: 'COMERCIAL',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'CREAR COTIZACION',
          url: 'cotizacion',
          roles: ['ADMIN', 'COMPRAS'],
        },
        {
          titulo: 'COTIZACIONES',
          url: 'cotizaciones',
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
        {
          titulo: 'reactivos',
          url: 'reactivos',
          roles: ['ADMIN', 'IMPORT'],
        },
      ],
    },*/
    {
      titulo: 'PRODUCTOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'PRODUCTOS',
          url: 'productos',
          roles: ['ADMIN', 'IMPORT', 'INVENTARIO'],
        },
        {
          titulo: 'CREAR PRODUCTO MANUAL',
          url: 'producto/Nuevo',
          roles: ['ADMIN', 'IMPORT', 'INVENTARIO'],
        },
      ],
    },

    {
      titulo: 'MANTENIMIENTOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'CREAR MARCA',
          url: 'marca/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'CREAR MODALIDAD',
          url: 'modalidad',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'Tipo contrato',
          url: 'contrato',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'CLIENTE',
          url: 'cliente',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'PRUEBAS',
          url: 'panelPruebas/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'PERFILES',
          url: 'panelperfiles',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'GRUPO',
          url: 'grupo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'ATENCION',
          url: 'atencion/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'SERVICIO',
          url: 'servicio/Nuevo',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'DIAGNOSTICO',
          url: 'diagnostico',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: ' EQUIPOS COMPLEMENTOS',
          url: 'equipocomplementario/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'TUBOS',
          url: 'tubos',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'TIPOMUESTRA',
          url: 'tipomuestra',
          roles: ['ADMIN', 'IMPORT'],
        },
        {
          titulo: 'IMPRESORA',
          url: 'impresora',
          roles: ['ADMIN', 'IMPORT'],
        },

        {
          titulo: 'CREAR CATEGORIA ',
          url: 'categoria/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'CREAR MODELO EQUIPO',
          url: 'analizador/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'stock-pruebas',
          url: 'stock-pruebas',
          roles: ['ADMIN'],
        },
        {
          titulo: 'CREAR ESTADO',
          url: 'estado/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'CREAR UBICACION',
          url: 'ubicacion/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'CREAR  FINANCIERO PROVEEDOR',
          url: 'estadofinancieroproveedor/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },

        {
          titulo: 'CREAR  FINANCIERO CLIENTE',
          url: 'estadofinancierocliente/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
      ],
    },
    {
      titulo: 'EQUIPOS',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'LISTA EQUIPOS',
          url: 'equipos',
          roles: ['ADMIN', 'OPERADOR'],
        },
        {
          titulo: 'CREAR EQUIPO',
          url: 'equipo/Nuevo',
          roles: ['ADMIN', 'OPERADOR'],
        },
      ],
    },
    {
      titulo: ' INVENTARIO',
      icono: 'right fas fa-angle-left',
      submenu: [
        {
          titulo: 'CARGA STOCK EXCEL',
          url: 'stock',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        //  {
        //   titulo: 'CARGA STOCK MANUAL',
        //   url: 'stock-manual',
        //   roles: ['ADMIN', 'INVENTARIO'],
        // },
        {
          titulo: 'DETALLE DE STOCK',
          url: 'stocks',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'SOLICITUD BODEGA',
          url: 'solicitud-pedidos/Nuevo',

          roles: ['ADMIN', 'INVENTARIO'],
        },

        {
          titulo: 'SOLICITUDES GENERADAS',
          url: 'solicitudes-pedidos',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'QR Code',
          url: 'QRCode',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        {
          titulo: 'STOCK BODEGA',
          url: 'stockbodega',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        /* {
          titulo: 'descargobodega',
          url: 'descargobodega',
          roles: ['ADMIN', 'INVENTARIO','DESCARGO'],
        }, */

        //   {
        //   titulo: 'Validacion',
        //   url: 'validacion',
        //   roles: ['ADMIN'],
        // },
        // {
        //   titulo: 'TRANSFERENCIA',
        //   url: 'transferencia',
        //   roles: ['ADMIN'],
        // },
        {
          titulo: 'PROVEEDORES',
          url: 'correos',
          roles: ['ADMIN', , 'INVENTARIO'],
        },
        {
          titulo: 'BODEGA',
          url: 'bodega/Nuevo',
          roles: ['ADMIN', 'INVENTARIO'],
        },
        /*  {
          titulo: 'RESULTADOS',
          url: 'resultados',
          roles: ['ADMIN'],
        },

        {
          titulo: 'ReportesResultados',
          url: 'ReportesResultados',
          roles: ['ADMIN'],
        }, */
      ],
    },
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
