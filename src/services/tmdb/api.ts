"use server";

import { TimeWindow, TrendingResponse } from "./schema";

const TMDBBaseUrl = "https://api.themoviedb.org/3";
const TMDBApiKey = process.env.TMDB_API_KEY;

// https://developer.themoviedb.org/reference/trending-all

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
