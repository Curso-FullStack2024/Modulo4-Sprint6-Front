import axios from "axios";
const api=axios.create({
    // baseURL:import.meta.env.VITE_BASE_URL
    baseURL:`http://www.omdbapi.com/`
})


export const traeRating =  (imdb) =>  api.get(`?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${imdb}`)

