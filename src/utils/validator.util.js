const validator = (data) => {
    let errors = {};

    if (
        !data.fullName ||
        typeof data.fullName !== 'string' ||
        data.fullName.trim().length === 0 ||
        data.fullName.trim().length > 30 ||
        !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?:\s+[-\sa-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+)?$/.test(data.fullName)) {
        errors.fullName = "El nombre completo es obligatorio y debe contener solo letras y espacios, con un máximo de 30 caracteres.";
    }

    if (
        data.phone &&
        (!data.phone ||
            typeof data.phone !== 'string' ||
            data.phone.trim().length === 0 ||
            !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(data.phone))) {
        errors.phone = "El número de teléfono debe tener un formato válido para Argentina.";
    }

    if (
        data.address &&
        (!data.address ||
            typeof data.address !== 'string' ||
            data.address.trim().length === 0 ||
            data.address.trim().length > 20 || !/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s]+$/.test(data.address))) {
        errors.address = "La dirección debe contener solo letras, números y espacios, con un máximo de 20 caracteres.";
    }

    if ( 
        data.profession &&
        (!data.profession ||
            typeof data.profession !== 'string' ||
            data.profession.trim().length === 0 ||
            data.profession.trim().length > 25 || !/^[A-Za-z0-9ÁÉÍÓÚáéíóúÜüÑñ\s\/()]+$/.test(data.profession))) {
        errors.profession = "La ocupación debe contener solo letras espacios, acentos , con un máximo de 25 caracteres.";
    }

    if (
        data.aboutMe &&
        (typeof data.aboutMe !== 'string' ||
            data.aboutMe.trim().length === 0 ||
            data.aboutMe.trim().length > 200)) {
        errors.aboutMe = "El campo 'Sobre mí' debe tener como máximo 200 caracteres.";
    }

    return errors;
}

module.exports = { validator };