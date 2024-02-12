const formatPeople = (result) => {
    return result.map((data) => {
        const dataObject = data.dataValues
        //armo el weekC en base al week calendar
        if (dataObject.weekCalendar === null) {
            // Si es null, crear un nuevo array con 21 elementos, todos establecidos en false
            dataObject.weekCalendar = new Array(21).fill(false);
        } else {
            // Si no es null, verificar si la longitud del array es menor que 21
            if (dataObject.weekCalendar.length < 21) {
                // Si es menor, extender el array a 21 elementos con false
                while (dataObject.weekCalendar.length < 21) {
                    dataObject.weekCalendar.push(false);
                }
            }
        }

        const peopleData = {
            idPeople: dataObject.idPeople,
            fullName: dataObject.fullName,
            address: dataObject.address,
            idLocation: dataObject.idLocation,
            locationName: dataObject.locationName,
            idProvince: dataObject.idProvince,
            provinceName: dataObject.provinceName,
            geoposition: dataObject.geoposition,
            birthDate: dataObject.birthDate,
            age: dataObject.age,
            idGenre: dataObject.idGenre,
            state: dataObject.state,
            aboutMe: dataObject.aboutMe,
            dateOfAdmission: dataObject.dateOfAdmission,
            typeOfPerson: dataObject.typeOfPerson,
            email: dataObject.email,
            externalLogin: dataObject.externalLogin,
            weekCalendar: dataObject.weekCalendar,
            averageRating: dataObject.averageRating,
            countRating: dataObject.countRating,
            logged: dataObject.logged,
            phone: dataObject.phone,
            location: dataObject.location,
            country: dataObject.country,
            profession: dataObject.profession,
            image: dataObject.image,
            minPrice: dataObject.minPrice,
            categories: [], // Inicializar array para las categorías
        };

        if (dataObject.people_options && Array.isArray(dataObject.people_options)) {
            dataObject.people_options.forEach((option) => {
                const category = {
                    idCategorie: option.categories_option.category.idCategorie,
                    description: option.categories_option.category.description,
                    isGenre: option.categories_option.category.isGenre,
                    isEducation: option.categories_option.category.isEducation,
                    isSkill: option.categories_option.category.isSkill,
                    isService: option.categories_option.category.isService,
                    isInterest: option.categories_option.category.isInterest,
                    isExperience: option.categories_option.category.isExperience,
                    isExtra: option.categories_option.category.isExtra,
                    includeCustomer: option.categories_option.category.includeCustomer,
                    includeProvider: option.categories_option.category.includeProvider,
                };

                const categoryOption = {
                    idOption: option.idOption,
                    description: option.categories_option.description,
                    people_options: [], // Inicializar array para las people_options
                };

                const peopleOption = {
                    idOption: option.id,
                    description: option.description,
                    price: option.price,
                    date: option.date,
                    year: option.year,
                    institution: option.institution,
                    comment: option.comment,
                };

                // Anidar dentro de categories
                const existingCategory = peopleData.categories.find((c) => c.idCategorie === category.idCategorie);
                if (!existingCategory) {
                    peopleData.categories.push({
                        ...category,
                        categories_options: [categoryOption],
                    });
                } else {
                    existingCategory.categories_options.push(categoryOption);
                }
                // Ordenar las categorías por idCategorie
                peopleData.categories.sort((a, b) => a.idCategorie - b.idCategorie);

                peopleData.categories.forEach((category) => {
                    category.categories_options.sort((a, b) => a.idOption - b.idOption);
                });

                // Anidar dentro de people_options
                categoryOption.people_options.push(peopleOption);
            });
        }

        return {
            people: peopleData,
            // No es necesario devolver 'categories' aquí, ya está dentro de 'people'
        };
    });
};

module.exports = formatPeople;