```bash
.Backend
├── index.js                               # Archivo principal.
├── LICENSE                                # Licensa del proyecto.
├── package.json                           # Contiene scripts y las dependencias instaladas.             
├── README.md                              # Descripción y instrucciones de instalación del proyecto. 
└── src                                    # Directorio con el còdigo fuente del proyecto.
    ├── app.js                             # Archivo de configuración de servidor ExpressJS.
    ├── db.js                              # Archivo de configuración de la base de datos. 
    ├── controllers                        # Directorio contenedor de controllers.
    ├── models                             # Directorio contenedor de las models.
    │   ├── categorias.js                  # Model de la tabla categorias.
    │   ├── categorias_opciones.js         # Model de la tabla intermedia categorias_opciones.
    │   ├── conversaciones.js              # Model de la tabla conversaciones.
    │   ├── oportunidades.js               # Model de la tabla oportunidades.
    │   ├── pagos.js                       # Model de la tabla pagos.
    │   ├── personas.js                    # Model de la tabla personas.
    │   ├── personas_logins.js             # Model de la tabla intermedia personas_logins.
    │   └── personas_opciones.js           # Model de la tabla intermedia personas_opciones.
    ├── routes                             # Directorio de rutas.
    │    └── index.js                      # Archivo principal de las rutas.
    ├── services                           # Contienes funciones que se conectan con API's y Base de datos. 
```