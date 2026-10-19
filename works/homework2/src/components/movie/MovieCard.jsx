import MovieInfo from "./MovieInfo.jsx";
import MoviePoster from "./MoviePoster.jsx";

function MovieCard({ title, director, year, poster, studio }) {
    return(
        <article>
            <MoviePoster poster={poster} title={title} />
            <MovieInfo title={title} director={director} year={year} studio={studio} />
        </article>
    )
}

export default MovieCard;
