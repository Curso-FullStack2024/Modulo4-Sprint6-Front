import axios from "axios";
import api from "./authApi";
// const api=axios.create({
//    baseURL:'http://127.0.0.1:3500',
//     //  baseURL:'https://modulo4-sprint6-back-1.onrender.com'
// })

export const crearPerfil =  (profile) =>  api.post('/profile/create', profile)
export const obtenerPerfiles =  (id) =>  api.get('/profile/userid/'+ id)
export const borrarPerfil =  (id) =>  api.delete('/profile/delete/'+ id)
export const editarPerfil =  (id, data) =>  api.post('/profile/update/'+ id, data)


// export default api