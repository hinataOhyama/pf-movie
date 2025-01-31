"use server";

import {
  CreditResponse,
  DetailResponse,
  MediaType,
  MovieDiscoverResponse,
  SearchMultiResponse,
  SortBy,
  TimeWindow,
  TrendingResponse,
  TVDiscoverResponse,
  VideoResponse,
} from "./schema";

const TMDBBaseUrl = "https://api.themoviedb.org/3";
const TMDBApiKey = process.env.TMDB_API_KEY;

/**
 * @see https://developer.themoviedb.org/reference/trending-all
 */
export const fetchTrending = async (
  timeWindow: TimeWindow = "day"
): Promise<TrendingResponse> => {
  const url = `${TMDBBaseUrl}/trending/all/${timeWindow}?api_key=${TMDBApiKey}`;
  const trendingResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching trending", err);
      return null;
    });

  return trendingResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/person-details
 * @see https://developer.themoviedb.org/reference/movie-details
 * @see https://developer.themoviedb.org/reference/tv-series-details
 */
export const fetchDetails = async (
  mediaType: MediaType = "tv",
  id: number
): Promise<DetailResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}?api_key=${TMDBApiKey}`;
  const detailsResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching details", err);
      return null;
    });

  return detailsResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/movie-credits
 * @see https://developer.themoviedb.org/reference/tv-series-credits
 */
export const fetchCredits = async (
  mediaType: MediaType = "tv",
  id: number
): Promise<CreditResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}/credits?api_key=${TMDBApiKey}`;
  const creditsResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching credits", err);
      return null;
    });

  return creditsResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/movie-credits
 * @see https://developer.themoviedb.org/reference/tv-series-videos
 */
export const fetchVideos = async (
  mediaType: MediaType = "tv",
  id: number
): Promise<VideoResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}/videos?api_key=${TMDBApiKey}`;
  const videosResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching videos", err);
      return null;
    });

  return videosResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/discover-movie
 */
export const fetchMovies = async (
  page: number = 1,
  sortBy: SortBy = "popularity.desc"
): Promise<MovieDiscoverResponse> => {
  const url = `${TMDBBaseUrl}/discover/movie?api_key=${TMDBApiKey}&page=${page}&sort_by=${sortBy}`;
  const moviesResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching movies", err);
      return null;
    });

  return moviesResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/discover-tv
 */
export const fetchTV = async (
  page: number = 1,
  sortBy: SortBy = "popularity.desc"
): Promise<TVDiscoverResponse> => {
  const url = `${TMDBBaseUrl}/discover/tv?api_key=${TMDBApiKey}&page=${page}&sort_by=${sortBy}`;
  const tvResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching tv", err);
      return null;
    });

  return tvResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/search-multi
 */
export const fetchSearchMulti = async (query: string, page: number = 1): Promise<SearchMultiResponse> => {
  const url = `${TMDBBaseUrl}/search/multi?api_key=${TMDBApiKey}&query=${query}&page=${page}`;
  const multiResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error search multi", err);
      return null;
    });

  return multiResponse;
};
