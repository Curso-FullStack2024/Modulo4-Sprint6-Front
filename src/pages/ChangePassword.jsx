import {  useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Label, Card, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";


//validaciones
const schema = yup.object().shape({
  currentPassword: yup.string().required('la contraseña actual es obligatoria').min(8, 'la contraseña debe tener al menos 8 caracteres').max(32,'debe tener 32 caracteres como maximo'),
  password: yup.string().required('la nueva contraseña es obligatoria').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
  password2: yup.string().required('la verificacioó de contraseña es obligatoria').oneOf([yup.ref('password'), null], 'las contraseñas no coinciden').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
})


const ChangePassword = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
   


  const navigate = useNavigate()
  const { changePassword } = useAuth()

  const onSubmit = async (data) => {

    try { //envia el objeto  
      await toast.promise(
        changePassword( data.currentPassword, data.password),
        {
          pending: 'Cambiando la contraseña...',
          success: 'Listo! 🎉',
          error: 'Error al cambiar la contraeña. Intenta nuevamente.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Contraseña cambiada!',
        confirmButtonText: 'Aceptar'
      })
      navigate(`/home`)

    } catch (error) {
      // console.log('error en login=>',error.response.data.message)
      console.log('error en cambiar contraseña=>', error)
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
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Cambio de contraseña </h3>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="currentPassword">Ingresa tu contraseña actual</Label>
            </div>
            <p className='text-red-500'>{errors.currentPassword?.message}</p>
            <TextInput {...register('currentPassword', { required: true })} type="password" />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password">Ingresa una nueva contraseña</Label>
            </div>
            <p className='text-red-500'>{errors.password?.message}</p>
            <TextInput {...register('password', { required: true })} type="password" />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password2">Repetí la contraseña</Label>
            </div>
            <p className='text-red-500'>{errors.password2?.message}</p>
            <TextInput {...register('password2', { required: true })} type="password" />
          </div>

          <div className="w-full">
            <Button type="submit">Aceptar</Button>
          </div>

          <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
         
          </div>
        </div>
      </form>
    </ Card>

  );
}
export default ChangePassword