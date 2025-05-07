import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { obtenerPelicula, obtenerPeliculas, obtenerGeneros, obtenerIdiomas, crearPelicula, obtenerPorTmdb,  obtenerTopPeliculas, editarPelicula } from '../api/movieApi'
import { traeRating } from '../api/ratingApi'
import { traeIMDb } from '../api/externalApi'

export const MovieContext = createContext()


export const MovieProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1})
   

    //POST
    const createMovie = async (movieData) => {        
            const {data , error} = await crearPelicula( movieData)
             console.log('error=>',data.message)
    }


    const editMovie = async (id, movieData) => {
        const {data , error} = await editarPelicula(id, movieData)
         console.log('error=>',data.message)
         
}
    
    const getMovies = async (page) => {               
        const {data , error} = await obtenerPeliculas(page)
        setPagination(data.pagination)        
        setMovies(data.data)
        console.log('error=>',data.error)
    }

    const getTopMovies = async (category ) => {               
        const {data , error} = await obtenerTopPeliculas(category )
        return (data)
        console.log('error=>',data.error)
    }


    const getMovieById = async (id) => {
        
        const {data , error} = await obtenerPelicula(id )
        console.log('error=>',data.error)
        return(data)
    }

    const getMovieByTmdb = async (id) => {        
    const {data , error} = await obtenerPorTmdb(id )
    console.log('error=>',data.error)
    return(data)
    }


    const getRating = async (imdb) => {    
        const {data , error} = await traeRating(imdb )
        
        console.log('error=>',data.error)
        return(data)
    }


    const getIMDb = async (id) => {            
        const {data , error} = await traeIMDb(id)        
        console.log('error=>',data.error)
        return(data)
    }

    const getGenres = async (userId) => {        
        const {data , error} = await obtenerGeneros( )
        console.log('error=>',data.error)
        return(data)
    }

    const getLanguages = async (userId) => {        
        const {data , error} = await obtenerIdiomas( )
        console.log('error=>',data.error)
        return(data)
    }

    const deleteProfile = async (id) => {
        
        const {data , error} = await borrarPerfil( id)
        setProfiles(profiles.filter(item=>item._id!==id))        
        console.log('error=>',data.error)
    }

    const validarToken = async (token) => {
        const { data, error} = await validarMailToken(token)
         console.log('error=>',data.message)
    }

/// envia un mail con un token
    const olvidoPassword = async (email) => {
        console.log(email)
        const { data, error} = await olvidoPass(email)
         console.log('error en olvido=>',data.message)
    }

///envia la nueva contrraseña
    const resetPassword = async (id, password) => {          
        const { data, error} = await resetPass(id, password)
         console.log('error en reset=>',data.message)
    }

    const loginUser = async (credentials) => {
        const {data} = await login(credentials)
          
        try {
             const decoded= jwtDecode(data.token)
             setUser(decoded)  
             localStorage.setItem('token',data.token)          
             localStorage.setItem('user', JSON.stringify(decoded))          
         } catch (error) {
            console.log(error)
         }
    }



    // PUT 
    const updateCard = async (id, updatedData) => {
        const { data } = await axios.put(`${url}/${id}`, updatedData)
        setCards((prev) =>
            prev.map((item) => (item.id == id ? data : item))
        )
    }

    //DELETE
    const deleteCard = async (id) => {
        await axios.delete(`${url}/${id}`)
        setCards((prev) => prev.filter((item) => item.id != id))
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const savedUser = localStorage.getItem('user');
    //     if (token && savedUser) {
    //       try {
            
    //         apiMovies.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //       } catch (err) {
    //         console.error('Error parsing saved user:', err);
    //       }
    //     }
    //   }, []);

    // // Cambio de página
    // const paginate = (pageNumber) => {
    //     // Asegurarse de que el número de página esté dentro del rango válido
    //     if (pageNumber >= 1 && pageNumber <= totalPages) {
    //         setCurrentPage(pageNumber);
    //         // Opcional: Desplazarse hacia arriba al cambiar de página
    //         window.scrollTo(0, 0);
    //     }
    // };

    // useEffect(() => {
    //     // Calcular el número total de páginas
    //     setTotalPages(Math.ceil(cards.length / cardsPerPage));
    //     // calcular el total de cartas
    //     setTotalCards(cards.length)

    //     // Actualizar las cartas que se muestran actualmente
    //     const indexOfLastCard = currentPage * cardsPerPage;
    //     const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    //     setCurrentCards(cards.slice(indexOfFirstCard, indexOfLastCard));
    // }, [cards, cardsPerPage, currentPage]);


    return (
        <MovieContext.Provider value={{movies, setMovies, getMovies, getGenres, getLanguages, getMovieById, createMovie, editMovie, getMovieByTmdb, getTopMovies, getRating, getIMDb, pagination}}>
            {children}
        </MovieContext.Provider>
    )
}

export const useMovies = () => useContext(MovieContext)



