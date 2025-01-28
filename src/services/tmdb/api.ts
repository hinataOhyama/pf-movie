"use server";

import { CreditResponse, DetailResponse, MediaType, TimeWindow, TrendingResponse, VideoResponse } from "./schema";

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
export const fetchDetails = async (mediaType: MediaType = "tv", id: number): Promise<DetailResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}?api_key=${TMDBApiKey}`;
  const detailsResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching trending", err);
      return null;
    });

  return detailsResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/movie-credits
 * @see https://developer.themoviedb.org/reference/tv-series-credits
 */
export const fetchCredits = async (mediaType: MediaType = "tv", id: number): Promise<CreditResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}/credits?api_key=${TMDBApiKey}`;
  const creditsResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching trending", err);
      return null;
    });

  return creditsResponse;
};

/**
 * @see https://developer.themoviedb.org/reference/movie-credits
 * @see https://developer.themoviedb.org/reference/tv-series-videos
 */
export const fetchVideos = async (mediaType: MediaType = "tv", id: number): Promise<VideoResponse> => {
  const url = `${TMDBBaseUrl}/${mediaType}/${id}/videos?api_key=${TMDBApiKey}`;
  const videosResponse = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching trending", err);
      return null;
    });

  return videosResponse;
};
