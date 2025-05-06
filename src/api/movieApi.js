import axios from "axios";
import api from "./authApi";
// const apiMovies=axios.create({
//   baseURL:'http://127.0.0.1:3500',
//       // baseURL:'https://modulo4-sprint6-back-1.onrender.com'
// })


export const obtenerPeliculas =  () =>  api.get('/movies/')
export const obtenerPelicula =  (id) =>  api.get(`/movies/id/${id}`)
export const obtenerGeneros =  () =>  api.get(`/movies/genres/`)
export const obtenerIdiomas =  () =>  api.get(`/movies/languages/`)
export const crearPelicula =  (data) =>  api.post(`/movies/crear/`, data)
export const editarPelicula =  (id, data) =>  api.put(`/movies/actualizar/${id}`, data)
export const obtenerPorTmdb =  (id) =>  api.get(`/movies/tmdb/${id}`)
export const obtenerTopPeliculas =  (category) =>  api.get(`/movies/top/${category}`)

// export default api