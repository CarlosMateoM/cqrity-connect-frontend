import { mixed, object, string, ref, boolean } from 'yup';

export const userSchema = object({
    name: string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder los 50 caracteres')
        .required('El nombre es obligatorio'),
    email: string()
        .email('Debes ingresar un correo electrónico válido')
        .required('El correo electrónico es obligatorio'),
    password: string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(20, 'La contraseña no puede exceder los 20 caracteres')
        .required('La contraseña es obligatoria'),

    password_confirmation: string()
        .transform(value => value === '' ? undefined : value)
        .when('password', {
            is: val => val !== undefined && val.length > 0,
            then: schema => schema
                .required('La confirmación de la nueva contraseña es obligatoria')
                .oneOf([ref('password')], 'Las contraseñas no coinciden'),
            otherwise: schema => schema.optional(),
        }),

    role: string()
        .oneOf(['admin', 'user'], 'El rol debe ser "admin" o "user"')
        .required('El rol es obligatorio'),
    uuid: string()
        .required('El UUID es obligatorio'),
    image: mixed().test('fileSize', 'El archivo es demasiado grande', value => {
        if (!value) return true;
        const maxSize = 2 * 1024 * 1024;
        return value.size <= maxSize;
    }).test('fileType', 'El archivo debe ser una imagen (jpg, jpeg, png)', value => {
        if (!value) return true;
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return validTypes.includes(value.type);
    }),
});


export const updateUserSchema = object({
    name: string()
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no puede exceder los 50 caracteres'),
    email: string()
        .email('Debes ingresar un correo electrónico válido'),
    password: string()
        .transform(value => value === '' ? undefined : value)
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .max(20, 'La contraseña no puede exceder los 20 caracteres'),

    password_confirmation: string()
        .transform(value => value === '' ? undefined : value)
        .when('password', {
            is: val => val !== undefined && val.length > 0,
            then: schema => schema
                .required('La confirmación de la nueva contraseña es obligatoria')
                .oneOf([ref('password')], 'Las contraseñas no coinciden'),
            otherwise: schema => schema.optional(),
        }),

    role: string()
        .oneOf(['admin', 'user'], 'El rol debe ser "admin" o "user"'),
    isActive: boolean(),

    image: mixed().test('fileSize', 'El archivo es demasiado grande', value => {
        if (!value) return true;
        const maxSize = 2 * 1024 * 1024;
        return value.size <= maxSize;
    }).test('fileType', 'El archivo debe ser una imagen (jpg, jpeg, png)', value => {
        if (!value) return true;
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        return validTypes.includes(value.type);
    }),
});

