import React, { useState, useEffect } from 'react'
import { useMovies } from '../contexts/MovieContext'
import { useProfile } from '../contexts/ProfileContext'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import translate  from  'translate'
import { toast } from 'react-toastify'
import MovieRating from '../components/Rating'

const MovieDetail = () => {
  
  const navigate = useNavigate()
  const [currentMovie, setCurrentMovie] = useState(null)
  const [movieId, setMovieId] = useState(null)
  const [externalIDs, setExternalIds] = useState(null)
  const [rating, setRating] = useState(null)
  const { isInWatchlist, toggleWatchlist, currentProfile}=useProfile()
  const { getMovieById, getRating, getIMDb } = useMovies()
  const { id } = useParams()
  
  // console.log(movieId)
  
  const formatoFecha = (fecha) => {
    const newFecha = new Date(fecha)
    return newFecha.toLocaleDateString("es-ES")
  }
  
  const translateText = async (text) => {
    try {
      const translatedText = await translate(text, { to: 'es' });
      return translatedText;
    } catch (error) {
      console.error('Error al traducir el texto:', error);
      return text; // Devuelve el texto original en caso de error
    }
  };


          const addToWatchlist = () => {
              toast.info(isInWatchlist(currentMovie._id) ? "se quitó de Mi Lista":"se agregó de Mi Lista...");
              const data={
                _id: currentMovie._id,
                title:currentMovie.title,
                poster_path:currentMovie.poster_path

              }
              toggleWatchlist(data, currentProfile._id)                 
          }

  useEffect(() => {
    setMovieId(id)
    
  }, [])

  useEffect(() => {
    const traeRating = async() =>{
     
      const ext=await getRating(externalIDs?.imdb_id)
    setRating(await ext.Ratings[2].Source)
   
  }
  traeRating()
}
  , [externalIDs])
  
  useEffect(() => {
    const traeMovie = async () => {
      try {
        if (movieId){
        const movie= await getMovieById(movieId)
        if (movie){
          setCurrentMovie(movie)
           setExternalIds(await getIMDb(movie.id))
         
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    traeMovie()
  }, [id, movieId])

  return (
    <div className={`flex flex-content justify-center bg-cover bg-center bg-no-repeat h-full`} >
      <div className="flex flex-col justify-center items-center w-full h-full ">



          {currentMovie &&
        <div className={`flex flex-wrap justify-center gap-3 p-3 min-h-screen bg-[url(https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path})]`}>

            <div className='flex flex-content flex-col  border-1 border-red-600 rounded-lg   bg-gray-200  p-5  md:m-3   shadow-md shadow-800 w-full md:w-300 relative'>
              <h1 className="text-4xl font-bold  my-3 text-center">{currentMovie.title}</h1>
              <div className='flex items-center justify-center'> <img src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path ? currentMovie.backdrop_path : currentMovie.poster_path}`} alt="" /></div>
              <div className='     absolute  right-5 top-5 text-red-600 text-3xl cursor-pointer' onClick={() => navigate(-1)} title='Volver'><i className="bi bi-arrow-left-square"></i></div>
              <div className='flex flex-content flex-col md:flex-row items-center justify-center'>
                {/* {currentMovie.backdrop_path && <img src={`https://image.tmdb.org/t/p/original/${currentMovie.backdrop_path}`} alt={currentMovie.title} className='w-50 md:w-80 ' />} */}
                {/* {currentMovie.poster_path && <img src={`https://image.tmdb.org/t/p/original/${currentMovie.poster_path}`} alt={currentMovie.original_title} className='w-50 md:w-80 ' />} */}
              </div>
              <div className='flex flex-col p-5'>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Título orginal:</span> {currentMovie.original_title} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Idioma original:</span> {currentMovie.language} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Resumen:</span> {currentMovie.overview} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Lanzamiento:</span> {formatoFecha(currentMovie.release_date)} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Popularidad: </span>{currentMovie.popularity} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Genero: </span>{currentMovie.genres.join(', ')} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>IMDb: </span>{externalIDs?.imdb_id} </p>
                <p className='md:text-2xl pt-2 ' ><span className='font-bold '>Rating: </span>{  <MovieRating value={rating || 0} /> } </p>
                <div className='text-red-600 font-bold z-10 text-xl p-3 cursor-pointer' onClick={() => {  addToWatchlist() }} >
                {isInWatchlist(currentMovie._id)  ?  'Quitar de ' : 'Agregar a '} Mi Lista <i className={` text-xl bi ${isInWatchlist(currentMovie._id) ? 'bi-heart-fill text-red-700' : 'bi-heart'} z-10`} ></i>
        </div>
              </div>

            </div>


        </div>
          }
      </div>
    </div>
  )
}

export default MovieDetail