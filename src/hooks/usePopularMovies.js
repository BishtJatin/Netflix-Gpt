import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movies.popularMovies);

  useEffect(() => {
    if (popularMovies) return;

    const getPopularMovies = async () => {
      try {
        console.log("Fetching Popular Movies...");
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?page=1",
          API_OPTIONS
        );

        if (!data.ok) {
          console.error("Failed to fetch popular movies:", data.status, data.statusText);
          return;
        }

        const json = await data.json();
        console.log("Popular Movies received:", json);

        if (json.results && json.results.length > 0) {
          dispatch(addPopularMovies(json.results));
          console.log("Popular Movies dispatched to store");
        } else {
          console.warn("No results found in popular movies response");
        }
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    getPopularMovies();
  }, [dispatch, popularMovies]);
};

export default usePopularMovies;