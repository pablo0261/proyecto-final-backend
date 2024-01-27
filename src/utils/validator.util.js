const validator = (data) => {
    let errors = {};

    const MIN_FULLNAME_LENGTH = 2;
    const MAX_FULLNAME_LENGTH = 50;
    const MAX_ADDRESS_LENGTH = 100;
    const fullNameRegex = /^[\p{L} .'-]+$/u;
    const geopositionRegex = /^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6},\s*-?([1]?[1-7]?[1-9]|[1-9]0)\.{1}\d{1,6}$/;
    const MAX_ABOUT_ME_LENGTH = 1000;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        typeof data.fullName !== 'string' ||
        data.fullName.trim().length < MIN_FULLNAME_LENGTH ||
        data.fullName.trim().length > MAX_FULLNAME_LENGTH) {
        errors.fullName = `El nombre completo debe ser una cadena de texto entre ${MIN_FULLNAME_LENGTH} y ${MAX_FULLNAME_LENGTH} caracteres.`;
    }

    if (!data.fullName.trim()) {
        errors.fullName = 'El nombre completo no puede estar vacío.';
    }

    if (!fullNameRegex.test(data.fullName)) {
        errors.fullName = 'El nombre completo solo puede contener letras del alfabeto, espacios, guiones, comillas y puntos.';
    }

    if (data.address && (typeof data.address !== 'string' || data.address.trim().length > MAX_ADDRESS_LENGTH)) {
        errors.address = `La dirección debe ser una cadena de texto con un máximo de ${MAX_ADDRESS_LENGTH} caracteres.`
    }

    if (data.geoposition && !geopositionRegex.test(data.geoposition.trim())) {
        errors.geoposition = "El formato de la geoposición no es válido.";
    }

    // if (!/^\d{4}-\d{2}-\d{2}$/.test(data.birthDate)) {
    //     errors.birthDate = "El formato de la fecha de nacimiento no es válido. Debe ser YYYY-MM-DD."
    // }

    if (data.idGenre !== undefined) {
        if (typeof data.idGenre !== 'number' || !Number.isInteger(data.idGenre)) {
            errors.idGenre = 'El valor de idGenre debe ser un número entero.';
        }
    }

    if (data.state !== undefined) {
        if (!['Active', 'Inactive', 'Deleted'].includes(data.state)) {
            errors.state = 'El valor de state debe ser "Active", "Inactive" o "Deleted".';
        }
    }

    if (data.aboutMe !== undefined) {
        if (data.aboutMe.length > MAX_ABOUT_ME_LENGTH) {
            errors.aboutMe = `El campo aboutMe no puede tener más de ${MAX_ABOUT_ME_LENGTH} caracteres.`;
        }
    }

    if (data.typeOfPerson !== undefined) {
        const allowedTypes = ['administrator', 'customer', 'provider'];
        if (!allowedTypes.includes(data.typeOfPerson)) {
            errors.typeOfPerson = 'El valor de typeOfPerson no es válido.';
        }
    }

    if (data.email !== undefined) {
        if (!emailRegex.test(data.email)) {
            errors.email = 'El formato del email no es válido.';
        }
    }

    if (data.password !== undefined) {
        if (data.password.length < 8 || data.password.length > 16) {
            errors.password = 'La contraseña debe tener entre 8 y 16 caracteres.';
        }

        if (!/[A-Z]/.test(data.password)) {
            errors.password = 'La contraseña debe contener al menos una letra mayúscula.';
        }

        if (!/\d/.test(data.password)) {
            errors.password = 'La contraseña debe contener al menos un número.';
        }
    }

    if (data.weekCalendar !== undefined) {
        if (!Array.isArray(data.weekCalendar)) {
            errors.weekCalendar = 'weekCalendar debe ser un array.';
        } else {
            if (data.weekCalendar.length !== 7) {
                errors.weekCalendar = 'weekCalendar debe contener 7 elementos correspondientes a los días de la semana.';
            } else {
                for (let i = 0; i < data.weekCalendar.length; i++) {
                    if (typeof data.weekCalendar[i] !== 'boolean') {
                        errors.weekCalendar = 'Los elementos de weekCalendar deben ser booleanos.';
                        break;
                    }
                }
            }
        }
    }

    if (data.image !== undefined) {
        if (typeof data.image !== 'string') {
            errors.image = 'image debe ser una cadena de caracteres.';
        }
    }

    if (data.age !== undefined) {
        if (typeof data.age !== 'number' || data.age < 0 || data.age > 150) {
            errors.image = `La edad calculada no es válida:', ${data.age}`;
        }
    }

    return errors;

}

module.exports = { validator };