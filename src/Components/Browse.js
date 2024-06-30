import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useDispatch, useSelector } from "react-redux";
import MovieDetail from "./MovieDetail"
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMOvies from "../hooks/useUpcomingMOvies";
import { openOrCloseMovieModal } from "../utils/moviesSlice";

const Browse = () => {
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movieModal = useSelector((store) => store.movies?.movieModal);
  const handleModalClose = () => {
    dispatch(openOrCloseMovieModal({ isOpen: false, detail: null }));
  };
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMOvies();
  useTopRatedMovies();

  return (
    <div className="">
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
      <MovieDetail
        onClose={handleModalClose}
        {...movieModal?.detail}
        isOpen={movieModal.isOpen}
      />
    </div>
  );
};
export default Browse;