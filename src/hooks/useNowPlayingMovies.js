import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  useEffect(() => {
    if (nowPlayingMovies) return;

    const getNowPlayingMovies = async () => {
      try {
        console.log("Fetching Now Playing Movies...");
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?page=1",
          API_OPTIONS
        );

        if (!data.ok) {
          console.error("Failed to fetch now playing movies:", data.status, data.statusText);
          return;
        }

        const json = await data.json();
        console.log("Now Playing Movies received:", json);

        if (json.results && json.results.length > 0) {
          dispatch(addNowPlayingMovies(json.results));
          console.log("Now Playing Movies dispatched to store");
        } else {
          console.warn("No results found in now playing movies response");
        }
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    };

    getNowPlayingMovies();
  }, [dispatch, nowPlayingMovies]);
};

export default useNowPlayingMovies;