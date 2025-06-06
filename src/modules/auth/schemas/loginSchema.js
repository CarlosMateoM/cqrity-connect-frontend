import { object, string } from 'yup';

export const loginSchema = object({
  
    email: string()
    .email('Debes ingresar un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),

  password: string()
    .min(4, 'La contraseña debe tener al menos 4 caracteres')
    .required('La contraseña es obligatoria'),

});