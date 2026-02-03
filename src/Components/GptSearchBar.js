
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult } from "../utils/gptSlice";
import { AI_KEY } from "../utils/constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };



  const handleGptSearchClick = async () => {


    // Make an API call to GPT API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query: " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      // Initialize Google Generative AI with Gemini 3 Flash
      const genAI = new GoogleGenerativeAI(AI_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

      // Generate content using the official SDK
      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();

      const gptMovies = text.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie.trim()));

      const tmdbResults = await Promise.all(promiseArray);



      dispatch(
        addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
      );
    } catch (error) {
      console.error("Error fetching Gemini results: ", error);
      alert("Unable to get movie recommendations. Please make sure Cloudflare WARP is active and try again.");
    }
  };

  return (
    <div className="pt-[40%]  md:pt-[10%] flex justify-center mb-10">
      <form
        className="w-full md:w-1/2 bg-black grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className=" p-4 m-4 col-span-9"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button
          className="col-span-3 mr-1  m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
          onClick={handleGptSearchClick}
        >
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};
export default GptSearchBar;