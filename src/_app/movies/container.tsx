import { fetchMovies } from "@/services/tmdb/api";
import MoviesPresentation from "./presentation";

const MoviesContainer = async () => {
  const moviesData = await fetchMovies(1, "popularity.desc");

  return <MoviesPresentation moviesData={moviesData}/>;
};

export default MoviesContainer;
