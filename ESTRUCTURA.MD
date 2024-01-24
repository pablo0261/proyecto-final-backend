```bash
.Backend
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
    │       ├── getPeopleById.controller.js
    │       ├── getPeople.controller.js
    │       ├── getPeopleFilter.controller.js
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
    │   ├── index.js
    │   └── people.router.js
    ├── services
    │   ├── categories
    │   │   ├── getCategories.service.js
    │   │   └── postCategorias.service.js
    │   └── people
    │       ├── getPeopleById.service.js
    │       ├── getPeopleFilter.service.js
    │       ├── getPeople.service.js
    │       └── postPeople.service.js
    └── swagger.js

```