import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";
import { openOrCloseMovieModal } from "../utils/moviesSlice";

const MovieCard = ({ posterPath, movieId, title, rate }) => {
  const dispatch = useDispatch();
  if (!posterPath) return null;
  const handleModalOpen = () => {
  
    dispatch(
      openOrCloseMovieModal({
        isOpen: true,
        detail: {
          movieId,
          title,
          rate,
        },
      })
    );
  };
  return (
    <div className="w-36 md:w-48 pr-4 hover:scale-110"
    onClick={handleModalOpen}>
      <img alt="Movie Card" src={IMG_CDN_URL + posterPath} />
    </div>
  );
};
export default MovieCard;