```bash
.Backend
├── database.sql
├── ESTRUCTURA.MD
├── index.js
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── src
    ├── app.js
    ├── controllers
    │   ├── categories
    │   │   ├── getCategories.controller.js
    │   │   └── postCategories.controller.js
    │   ├── logins
    │   │   ├── getLogins.controller.js
    │   │   └── putLogin.controller.js
    │   └── people
    │       ├── getPeople.controller.js
    │       └── putPeople.controller.js
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
    │   ├── categories_options.route.js
    │   ├── categories.route.js
    │   ├── index.js
    │   └── people.route.js
    └── services
        └── categories
            ├── getCategories.service.js
            └── postCategorias.service.js             
```