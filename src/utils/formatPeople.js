const formatPeople = (dataObject) => {
    return dataObject.map((dataObject) => {
        const peopleData = {
          idPeople: dataObject.idPeople,
          fullName: dataObject.fullName,
          address: dataObject.address,
          idLocation: dataObject.idLocation,
          geoposition: dataObject.geoposition,
          birthDate: dataObject.birthDate,
          idGenre: dataObject.idGenre,
          state: dataObject.state,
          noShow: dataObject.noShow,
          aboutMe: dataObject.aboutMe,
          dateOfAdmission: dataObject.dateOfAdmission,
          typeOfPerson: dataObject.typeOfPerson,
          email: dataObject.email,
          password: dataObject.password,
          externalLogin: dataObject.externalLogin,
          weekCalendar: dataObject.weekCalendar,
        };
    
        let categoriesData = [];
        let categoriesOptionsData = [];
    
        if (dataObject.people_options && Array.isArray(dataObject.people_options)) {
          dataObject.people_options.forEach((option) => {
            const category = {
              idCategorie: option.categories_option.category.idCategorie,
              description: option.categories_option.category.description,
              isGenre: option.categories_option.category.isGenre,
              isEducation: option.categories_option.category.isEducation,
              isSkill: option.categories_option.category.isSkill,
              isService: option.categories_option.category.isService,
              includeCustomer: option.categories_option.category.includeCustomer,
              includeProvider: option.categories_option.category.includeProvider,
            };
    
            const categoryOption = {
              idOption: option.idOption,
              idCategorie: option.categories_option.idCategorie,
              description: option.categories_option.description,
              people_options: [], // Inicializar array para las people_options
            };
    
            const peopleOption = {
              idOption: option.idOption,
              description: option.description,
              price: option.price,
              date: option.date,
              year: option.year,
              institution: option.institution,
              comment: option.comment,
            };
    
            // Anidar dentro de categories
            const existingCategory = categoriesData.find((c) => c.idCategorie === category.idCategorie);
            if (!existingCategory) {
              categoriesData.push({
                ...category,
                categories_options: [categoryOption],
              });
            } else {
              existingCategory.categories_options.push(categoryOption);
            }
    
            // Anidar dentro de categoriesOptionsData
            const existingCategoryOption = categoriesOptionsData.find((co) => co.idOption === categoryOption.idOption);
            if (!existingCategoryOption) {
              categoryOption.people_options.push(peopleOption);
              categoriesOptionsData.push(categoryOption);
            } else {
              existingCategoryOption.people_options.push(peopleOption);
            }
          });
        }
    
        return {
          people: peopleData,
          categories: categoriesData,
        //   categories_options: categoriesOptionsData,
        };
      });
    };

module.exports = formatPeople;