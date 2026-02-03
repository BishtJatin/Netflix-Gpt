
import React, { useEffect, useState } from "react";
import { API_OPTIONS } from "../utils/constants";

const MovieDetail = ({ isOpen, onClose, movieId, title, rate }) => {
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos`,
          API_OPTIONS
        );

        const data = await response.json();
        const filterData = data.results.filter(
          (video) => video.type === "Trailer"
        );
        const trailer = filterData.length ? filterData[0] : data.results[0];
        setTrailer(trailer);
      } catch (error) { }
    };
    getMovieVideos();
  }, [movieId]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0  backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-black text-white p-4 rounded-lg w-full md:w-1/2">
        <div className="flex justify-end items-start">
          <button className="text-white w-4" onClick={onClose}>
            x
          </button>
        </div>
        <div className="w-full">
          <iframe
            className="w-full aspect-video"
            src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="flex mt-2  justify-between ">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h1 className="text-xl text-yellow-400">IMDb : {rate}</h1>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;