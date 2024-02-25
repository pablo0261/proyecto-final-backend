```bash
.
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
    │   │   ├── deleteCategoriesOptions.controller.js
    │   │   ├── getCategoriesOptions.controller.js
    │   │   └── postCategoriesOptions.controller.js
    │   ├── chats
    │   │   ├── getChats.controller.js
    │   │   └── postChats.controller.js
    │   ├── geolocation
    │   │   ├── getMunicipalities.controller.js
    │   │   └── getProvinces.controller.js
    │   ├── logins
    │   │   ├── getLogins.controller.js
    │   │   ├── loginPeople.controller.js
    │   │   ├── logoutPeople.controller.js
    │   │   └── putLogin.controller.js
    │   ├── opportunities
    │   │   ├── getOpportunities.controller.js
    │   │   ├── postOpportunities.controller.js
    │   │   └── putOpportunities.controller.js
    │   ├── payments
    │   │   ├── paidMemberships.controller.js
    │   │   ├── payment.controller.js
    │   │   ├── receiveWebhook.controller.js
    │   │   └── updatePaidMemberships.controller.js
    │   ├── people
    │   │   ├── getPeople.controller.js
    │   │   ├── postPeople.controller.js
    │   │   └── putPeople.controlle.js
    │   ├── people_options
    │   │   ├── deletePeopleOptions.controller.js
    │   │   ├── getPeopleOptions.controller.js
    │   │   └── postPeopleOptions.controller.js
    │   ├── questions
    │   │   ├── deleteQuestions.controller.js
    │   │   ├── getQuestions.controller.js
    │   │   ├── postQuestions.controller.js
    │   │   └── putQuestions.controller.js
    │   ├── sendMail
    │   │   └── sendMail.controller.js
    │   └── stats
    │       ├── getAdministratorStats.controller.js
    │       ├── getBestComments.controller.js
    │       ├── getCustomerStats.controller.js
    │       ├── getLandingStats.controller.js
    │       └── getProviderStats.controller.js
    ├── db.js
    ├── errors
    │   └── index.js
    ├── helpers
    │   └── regex.helpers.js
    ├── models
    │   ├── categories.js
    │   ├── categories_options.js
    │   ├── chats.js
    │   ├── opportunities.js
    │   ├── payments.js
    │   ├── people.js
    │   ├── people_logins.js
    │   ├── people_options.js
    │   └── questions.js
    ├── routes
    │   ├── categories.route.js
    │   ├── chats.route.js
    │   ├── geolocation.route.js
    │   ├── index.js
    │   ├── opportunities.route.js
    │   ├── payments.route.js
    │   ├── people.route.js
    │   ├── questions.route.js
    │   ├── sendMail.route.js
    │   └── stats.route.js
    ├── services
    │   ├── categories
    │   │   ├── getCategories.service.js
    │   │   └── postCategorias.service.js
    │   ├── categories_options
    │   │   ├── deleteCategoriesOptions.service.js
    │   │   ├── getCategoriesOption.service.js
    │   │   └── postCategoriesOptions.service.js
    │   ├── chats
    │   │   ├── getChats.service.js
    │   │   └── postChats.service.js
    │   ├── geolocation
    │   │   ├── getMunicipalities.service.js
    │   │   └── getProvinces.service.js
    │   ├── logins
    │   │   ├── loginPeople.service.js
    │   │   └── logoutPeople.service.js
    │   ├── opportunities
    │   │   ├── getOpportunities.service.js
    │   │   ├── postOpportunities.services.js
    │   │   └── putOpportunities.services.js
    │   ├── payments
    │   │   ├── paidMemberships.service.js
    │   │   └── updatePaidMemberships.service.js
    │   ├── people
    │   │   ├── checkUnverified.js
    │   │   ├── getPeople.service.js
    │   │   ├── postPeople.service.js
    │   │   ├── putPeople.service.js
    │   │   └── putRating.service.js
    │   ├── people_options
    │   │   ├── deletePeopleOptions.service.js
    │   │   ├── getPeopleOptions.service.js
    │   │   └── postPeopleOptions.service.js
    │   ├── questions
    │   │   ├── deleteQuestions.service.js
    │   │   ├── getQuestions.service.js
    │   │   ├── postQuestions.service.js
    │   │   └── putQuestions.service.js
    │   ├── sendMail
    │   │   └── sendMail.service.js
    │   └── stats
    │       ├── getAdministratorStats.service.js
    │       ├── getBestComments.service.js
    │       ├── getCustomerStats.service.js
    │       ├── getLandingStats.service.js
    │       └── getProviderStats.service.js
    ├── swagger.js
    └── utils
        ├── add30Days.util.js
        ├── authenticateUser.util.js
        ├── checkEmailExists.util.js
        ├── convertDate.util.js
        ├── encrypt.util.js
        ├── formatDate.js
        ├── formatPeople.js
        ├── formattedGeolocation.util.js
        ├── postPeople.util.js
        ├── updateAges.js
        ├── validationDataFAQ.js
        ├── validationDataQAA.js
        └── validator.util.js
        
```