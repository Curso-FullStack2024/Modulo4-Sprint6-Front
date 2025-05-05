import axios from "axios";
const apiMovies=axios.create({
  // baseURL:'http://127.0.0.1:3500',
      baseURL:'https://modulo4-sprint6-back-1.onrender.com'
})


export const obtenerPeliculas =  () =>  apiMovies.get('/movies/')
export const obtenerPelicula =  (id) =>  apiMovies.get(`/movies/id/${id}`)
export const obtenerGeneros =  () =>  apiMovies.get(`/movies/genres/`)
export const obtenerIdiomas =  () =>  apiMovies.get(`/movies/languages/`)
export const crearPelicula =  (data) =>  apiMovies.post(`/movies/crear/`, data)
export const editarPelicula =  (id, data) =>  apiMovies.put(`/movies/actualizar/${id}`, data)
export const obtenerPorIMDb =  (id) =>  apiMovies.get(`/movies/imdb/${id}`)

export default apiMovies