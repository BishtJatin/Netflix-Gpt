import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import GptMovieSuggestions from "./GptMovieSuggestions";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.nowPlayingMovies && (
      <div className="bg-black">
        <div className=" className='mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20' ">
          <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />
          <MovieList title={"Top Rated"} movies={movies.popularMovies} />
          <MovieList title={"Popular"} movies={movies.popularMovies} />
          <MovieList
            title={"Upcoming Movies"}
            movies={movies.nowPlayingMovies}
          />
          <GptMovieSuggestions/>
        </div>
      </div>
    )
  );
};
export default SecondaryContainer;