```bash
.Backend
├── ESTRUCTURA.MD
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js
    ├── constants
    │   └── index.js
    ├── controllers
    │   ├── categories
    │   │   ├── getCategories.controller.js
    │   │   └── postCategories.controller.js
    │   ├── categories_options
    │   │   └── getCategoriesOptions.controller.js
    │   ├── geolocation
    │   │   ├── getMunicipalities.controller.js
    │   │   └── getProvinces.controller.js
    │   ├── logins
    │   │   ├── getLogins.controller.js
    │   │   └── putLogin.controller.js
    │   └── people
    │       ├── getPeopleById.controller.js
    │       ├── getPeople.controller.js
    │       ├── getPeopleOptions.controller.js
    │       └── postPeople.controller.js
    ├── db.js
    ├── models
    │   ├── categories.js
    │   ├── categories_options.js
    │   ├── chats.js
    │   ├── opportunities.js
    │   ├── payments.js
    │   ├── people.js
    │   ├── people_logins.js
    │   └── people_options.js
    ├── routes
    │   ├── categoriesRouter.js
    │   ├── geolocation.router.js
    │   ├── index.js
    │   └── people.router.js
    ├── services
    │   ├── categories
    │   │   ├── categories_options
    │   │   │   └── getCategoriesOption.service.js
    │   │   ├── getCategories.service.js
    │   │   └── postCategorias.service.js
    │   ├── geolocation
    │   │   ├── getMunicipalities.service.js
    │   │   └── getProvinces.service.js
    │   └── people
    │       ├── getPeopleById.service.js
    │       ├── getPeopleOptions.service.js
    │       ├── getPeople.service.js
    │       └── postPeople.service.js
    ├── swagger.js
    └── utils
        ├── formatPeople.js
        ├── formattedGeolocation.util.js
        └── validator.util.js
        prueba

```