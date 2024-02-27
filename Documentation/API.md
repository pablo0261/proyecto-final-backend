# Documentación del endpoint /api

## REST

- **Base URL**: [https://carewithlove.onrender.com/api](https://carewithlove.onrender.com/api)

  - La URL base contiene información sobre todos los recursos disponibles en la API.
  - Todas las respuestas devolverán datos en formato JSON.

  ### GET https://carewithlove.onrender.com

  ```json
  {
    "categories": "https://carewithlove.onrender.com/categories",
    "chats": "https://carewithlove.onrender.com/chats",
    "geolocation": "https://carewithlove.onrender.com/geolocation",
    "opportunities": "https://carewithlove.onrender.com/opportunities",
    "payments": "https://carewithlove.onrender.com/payments",
    "people": "https://carewithlove.onrender.com/people",
    "questions": "https://carewithlove.onrender.com/questions",
    "sendMail": "https://carewithlove.onrender.com/sendMail",
    "stats": "https://carewithlove.onrender.com/stats"
  }
  ```

### Actualmente hay nueve recursos disponibles:

- **categories**: Usado para crear, editar, obtener, eliminar las categorias.
- **chats**: Usado para hacer la comunicación cliente/servidor en socket.io.
- **geolocation**: Usado para obtener la ubicación de los proveedores (provincias y municipios).
- **opportunities**: Usado para crear, editar, obtener y eliminar las oportunidades entre cliente/proveedor.
- **payments**: Usado para crear un proveedor atravez del pago de la subcripcion via Mercado Pago. Tambien se obtiene información sobre los pagos de los proveedores.
- **people**: Usado para crear, editar, obtener, eliminar una persona. Tambien para hacer login y log out .
- **questions**: Usado para crear, editar, obtener y eliminar las FAQs de los usuarios.
- **sendMail**: Usado para el envio de emails para clientes y proveedores.
- **stats**: Usado para obtener datos estadisticos de la aplicación para mostrar a los usuarios: clientes, proveedores y administradores.
