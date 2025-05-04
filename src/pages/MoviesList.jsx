import React, { useEffect, useState } from 'react'

import { useMovies } from '../contexts/MovieContext'
import { useProfile } from '../contexts/ProfileContext';
import { Pagination } from "flowbite-react";

import MovieCard from '../components/MovieCard';


const MoviesList = () => {
   
    const { getMovies, movies } = useMovies()
    const { toggleWatchlist, isInWatchlist, currentProfile } = useProfile()
    const [currentPage, setCurrentPage] = useState(1);

    const onPageChange = (page) => setCurrentPage(page);



    useEffect(() => {
        getMovies()
    }
        , [])



    return (
        <>
            <div className="flex flex-content items-center ">
                <div className="flex flex-col justify-center items-center w-full h-full">

                    <h1 className="text-4xl font-bold  my-3">Películas</h1>


                    <div className="flex flex-content flex-wrap  justify-center gap-3 p-3">
                        {movies && movies.map((movie, index) => (
                            <MovieCard key={index} index={index} id={movie.id}  title={movie.title} poster_path={movie.poster_path} />

                        ))}
                    </div>
                </div>


            </div>
            <div className="flex overflow-x-auto sm:justify-center">
                <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />

            </div>

        </>
    )
}
export default MoviesList