function MovieInfo({ title, director, year, studio }) {
    return (
        <section>
            <h1>{title}</h1>
            <p>Director: {director}</p>
            <p>Year of release: {year}</p>
            <p>Studio: {studio}</p>
        </section>
    )
}

export default MovieInfo;
