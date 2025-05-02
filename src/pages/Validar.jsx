import { use, useRef, useState , useEffect} from "react";
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "../contexts/AuthContext";
import { Link , useNavigate, useParams} from "react-router-dom";
import { Button,  Label, Card, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'




const Validar=()=> {
   const {token} = useParams()

   const navigate = useNavigate()
   const { validarToken } = useAuth()

   const validarUsuario = async (token) => {
    
     try { //envia el objeto card 
       await toast.promise(
        validarToken(token),
         {
           pending: 'Verificando cuenta...',
           success: 'Cuenta verificada con éxito! 🎉',
           error: 'Error al verificar la cuenta.',
         }
       );
       Swal.fire({
         icon: 'success',
         title: 'Éxito',
         text: 'Cuenta verificada con éxito!',
         confirmButtonText: 'Aceptar'
       })
 
        navigate(`/login`)
 
     } catch (error) {
       console.log('error en Validar=>', error.response.data.message)
       Swal.fire({
         icon: 'error',
         title: 'Error',
         text: error.response.data.message,
         footer: error.message,
         confirmButtonText: 'Aceptar'
       })
       navigate('/')
     }
    }

useEffect(() => {
    const validar = async () => {
     
        await validarToken(token)
        navigate('/login')    
       
      }
    //verifica si el token es valido
    validarUsuario(token) 
   }, [])
 
   return (

    <Card className="fixed top-1/2 left-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg shadow dark:bg-gray-800">
     
        </ Card>
  );
}
export default Validar