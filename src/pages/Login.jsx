import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, Card, TextInput } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

//validaciones
const schema = yup.object().shape({
  email: yup.string().required('el mail es obligatorio'),
  password: yup.string().required('la contraseña es obligatoria'),
})


 const Login=()=> {
 const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
    const navigate = useNavigate()

    const { loginUser } = useAuth()
 

       const onSubmit = async (data) => {
    
         try { //envia el objeto card 
           await toast.promise(
              loginUser(data),
             {
               pending: 'Ingresando...',
              //  success: 'Bienvenido! 🎉',
               error: 'Error al ingresar. Intenta nuevamente.',
             }
           );       
             navigate(`/profiles`)
           //  navigate(`/validar/${data.token}`)
          //  navigate(`/`)
     
         } catch (error) {
           console.log('erro en login=>',error.response.data.message)
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ingresar a Nextfliks </h3>
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
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                {/* <Checkbox id="remember" />
                <Label htmlFor="remember">Recordar</Label> */}
              </div>
              <Link to='/olvidopassword' className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Olvidé la contraseña
              </Link>
            </div>
            <div className="w-full">
              <Button type="submit">Ingresar</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿No estás registrado?&nbsp;
              <Link to='/registro' className="text-cyan-700 hover:underline dark:text-cyan-500">
                Crear una cuenta
              </Link>
            </div>
          </div>
        </form>    
        </ Card>
  );
}
export default Login