import { Rating } from "flowbite-react";


const MovieRating = ({ value, max = 100, size = "md" }) => {
  // Convertir el valor de 0-100 a un rango de 0-5 estrellas (que es lo que usa Flowbite)
  const starsValue = Math.round((value / max) * 5);
  
  return (
    <div className="flex items-center">
      <Rating size={size}>
        {/* Mostrar 5 estrellas, rellenas según el valor calculado */}
        {[...Array(5)].map((_, i) => (
          <Rating.Star key={i} filled={i < starsValue} />
        ))}
      </Rating>
      <span className="ml-2 text-sm font-medium text-gray-500">
        {value}%
      </span>
    </div>
  );
};


export default MovieRating