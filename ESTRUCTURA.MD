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
    │   │   ├── loginPeople.controller.js
    │   │   └── putLogin.controller.js
    │   ├── opportunities
    │   │   ├── getOpportunities.controller.js
    │   │   ├── postOpportunities.controller.js
    │   │   └── putOpportunities.controller.js
    │   ├── people
    │   │   ├── getPeople.controller.js
    │   │   └── postPeople.controller.js
    │   └── people_options
    │       └── getPeopleOptions.controller.js
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
    │   ├── opportunitiesRouter.js
    │   └── people.router.js
    ├── services
    │   ├── categories
    │   │   ├── getCategories.service.js
    │   │   └── postCategorias.service.js
    │   ├── categories_options
    │   │   └── getCategoriesOption.service.js
    │   ├── geolocation
    │   │   ├── getMunicipalities.service.js
    │   │   └── getProvinces.service.js
    │   ├── logins
    │   │   └── loginPeople.service.js
    │   ├── opportunities
    │   │   ├── getOpportunities.service.js
    │   │   ├── postOpportunities.services.js
    │   │   └── putOpportunities.services.js
    │   ├── people
    │   │   ├── getPeople.service.js
    │   │   ├── postPeople.service.js
    │   │   └── putRating.service.js
    │   └── people_options
    │       └── getPeopleOptions.service.js
    ├── swagger.js
    └── utils
        ├── formatPeople.js
        ├── formattedGeolocation.util.js
        ├── updateAges.js
        └── validator.util.js

```