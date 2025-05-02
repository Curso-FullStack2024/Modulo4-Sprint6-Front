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
  email: yup.string().required('el mail es obligatorio').email('debes ingresar un mail válido'),
  
})


 const OlvidoPassword=()=> {
 const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
    const navigate = useNavigate()

    const { olvidoPassword } = useAuth()
 

       const onSubmit = async (data) => {
    
         try { //envia el objeto card 
           await toast.promise(
            olvidoPassword(data),
             {
               pending: 'Enviando...',
               success: 'Se envio un correo',
               error: 'Se produjo un error. Intenta nuevamente.',
             }
           );       
                      
           Swal.fire({
             icon: 'success',
             title: 'Éxito',
             text: 'se envió un correo !',
             text: 'Revisa tu email para cambiar la contraseña',
             footer: 'Recuerda revisar la carpeta de spam',
             confirmButtonText: 'Aceptar'
            })
             navigate(`/login`)

         } catch (error) {
           console.log('erro en olvido=>',error.response.data.message)
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Recuperar la contraseña </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Ingresa tu email</Label>
              </div>         
              <p className='text-red-500'>{errors.email?.message}</p>     
              <TextInput {...register('email', { required: true })} />
            </div>
            
            
            <div className="w-full">
              <Button type="submit">Enviar</Button>
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
export default OlvidoPassword