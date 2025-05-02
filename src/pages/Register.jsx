import { useRef, useState } from "react";
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "../contexts/AuthContext";
import { Link , useNavigate} from "react-router-dom";
import { Button,  Label, Card, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'


//validaciones
const schema = yup.object().shape({
  email: yup.string().required('el mail es obligatorio').email('debe ingresar un email válido').  matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'debe ingresar un email válido'),
  password: yup.string().required('la contraseña es obligatoria').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
  password2: yup.string().required('la contraseña es obligatoria').oneOf([yup.ref('password'), null], 'las contraseñas no coinciden').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
  // maxLevel: yup.number('debe ingresar un número').min(1, 'el nivel máximo debe ser mayor o igual a 1').max(99, 'el nivel máximo debe ser menor o igual a 99').required('deber indicar el nivel máximo '),
  // maxEvolutionLevel: yup.number('debe ingresar un número').nullable().transform((value, originalValue) =>
  //   originalValue === '' ? null : value).min(1, 'el nivel máximo debe ser mayor o igual a 1').max(99, 'el nivel máximo de evolución debe ser menor o igual a 99'),
  // elixirCost: yup.number('debe ingresar un numero').min(1, 'el costo de elixir debe ser mayor o igual a 1').max(9, 'el costo de elixir debe ser menor o igual a 9').required('el costo de elixir es obligatorio'),
  // rarity: yup.string().required('la calidad es obligatoria'),
  // medium: yup.string().url('debe ingresar una URL válida').matches(/\.(jpeg|jpg|gif|png|webp|svg)$/i, 'Debe ser una URL de imagen válida').required(),
  // evolutionMedium: yup.string().url('debe ingresar una URL válida').matches(/\.(jpeg|jpg|gif|png|webp|svg)$/i, 'Debe ser una URL de imagen válida').nullable()
  //   .transform((value, originalValue) =>
  //     originalValue === '' ? null : value)
})

 const Register=()=> {
   const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
   const navigate = useNavigate()
   const { createUser } = useAuth()

   const onSubmit = async (data) => {
   
     try { //envia el objeto card 
       await toast.promise(
          createUser(data),
         {
           pending: 'Creando cuenta...',
           success: 'Usuario creado con éxito! 🎉',
           error: 'Error al crear la cuenta. Intenta nuevamente.',
         }
       );
 Swal.fire({
         icon: 'success',
         title: 'Éxito',
         text: 'Usuario creado con éxito!',
         text: 'Revisa tu email para validar tu cuenta',
         footer: 'Recuerda revisar la carpeta de spam',
         confirmButtonText: 'Aceptar'
       })
 
       //  navigate(`/login`)
       //  navigate(`/validar/${data.token}`)
      //  navigate(`/`)
 
     } catch (error) {
       console.log('erro en register=>',error.response.data.message)
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: error.response.data.message,
         footer: error.message,
         confirmButtonText: 'Aceptar'
       })
     }
 
   }
 
   return (

    <Card className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg shadow dark:bg-gray-800">
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Registrate </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Ingresa tu email</Label>
              </div>
              <p className='text-red-500'>{errors.email?.message}</p>
              <TextInput {...register('email', { required: true })} />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Ingresa tu contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password?.message}</p>
              <TextInput {...register('password', { required: true })}  type="password"/>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2">Repetí la contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password2?.message}</p>
              <TextInput {...register('password2', { required: true })} type="password" />
            </div>
            
            <div className="w-full">
              <Button type="submit">Registrar</Button>
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿Ya estás registrado?&nbsp;
              <Link to='/login' className="text-cyan-700 hover:underline dark:text-cyan-500">
                Ingresá a tu cuenta
              </Link>
            </div>
          </div>
        </form>    
        </ Card>
  );
}
export default Register