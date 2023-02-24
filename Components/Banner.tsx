import Image from "next/image";
import { useEffect, useState } from "react";
import { baseUrl } from "../Constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  // console.log(movie);

  return (
    <div className="flex flex-col space-y-2 py-16 md:sp-y-4 lg:h-[65vh] lg:justify-end lg:pb-10">
      <div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen">
        <Image
          objectFit="cover"
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        />
      </div>
      <h1 className="text-2xl font-bold lg:text-7x1 md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3  ">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:g-7 w-7" />
          Play
        </button>
        <button className="bannerButton bg-[grey]/70">
          More Info <InformationCircleIcon className="h-5 w-5 md:w-8" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
