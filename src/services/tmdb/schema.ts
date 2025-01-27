import { z } from "zod";

const TrendingSchema = z.object({
  page: z.number(),
  results: z.array(
    z.object({
      adult: z.boolean(),
      backdrop_path: z.string(),
      id: z.number(),
      title: z.string(),
      original_language: z.string(),
      original_title: z.string(),
      overview: z.string(),
      poster_path: z.string(),
      media_type: z.string(),
      genre_ids: z.array(z.number()),
      popularity: z.number(),
      release_date: z.string(),
      video: z.boolean(),
      vote_average: z.number(),
      vote_count: z.number(),
    })
  ),
  total_pages: z.number(),
  total_results: z.number(),
});

type TrendingResponse = z.infer<typeof TrendingSchema>;
type TrendingResults = TrendingResponse["results"];
type TrendingResult = TrendingResults[number];
type TimeWindow = "day" | "week";

const TVDetailSchema = z.object({
  adult: z.boolean().default(true),
  backdrop_path: z.string(),
  created_by: z.array(
    z.object({
      id: z.number().default(0),
      credit_id: z.string(),
      name: z.string(),
      gender: z.number().default(0),
      profile_path: z.string(),
    })
  ),
  episode_run_time: z.array(z.number()),
  first_air_date: z.string(),
  genres: z.array(
    z.object({
      id: z.number().default(0),
      name: z.string(),
    })
  ),
  homepage: z.string(),
  in_production: z.boolean().default(true),
  languages: z.array(z.string()),
  last_air_date: z.string(),
  last_episode_to_air: z.object({
    id: z.number().default(0),
    name: z.string(),
    overview: z.string(),
    vote_average: z.number().default(0),
    vote_count: z.number().default(0),
    air_date: z.string(),
    episode_number: z.number().default(0),
    production_code: z.string(),
    runtime: z.number().default(0),
    season_number: z.number().default(0),
    show_id: z.number().default(0),
    still_path: z.string(),
  }),
  networks: z.array(
    z.object({
      id: z.number().default(0),
      logo_path: z.string(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  number_of_episodes: z.number().default(0),
  number_of_seasons: z.number().default(0),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  popularity: z.number().default(0),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number().default(0),
      logo_path: z.string(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ),
  seasons: z.array(
    z.object({
      air_date: z.string(),
      episode_count: z.number().default(0),
      id: z.number().default(0),
      name: z.string(),
      overview: z.string(),
      poster_path: z.string(),
      season_number: z.number().default(0),
      vote_average: z.number().default(0),
    })
  ),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string(),
  type: z.string(),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
});

const MovieDetailSchema = z.object({
  adult: z.boolean().default(true),
  backdrop_path: z.string(),
  belongs_to_collection: z.string(),
  budget: z.number().default(0),
  genres: z.array(
    z.object({
      id: z.number().default(0),
      name: z.string(),
    })
  ),
  homepage: z.string(),
  id: z.number().default(0),
  imdb_id: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().default(0),
  poster_path: z.string(),
  production_companies: z.array(
    z.object({
      id: z.number().default(0),
      logo_path: z.string(),
      name: z.string(),
      origin_country: z.string(),
    })
  ),
  production_countries: z.array(
    z.object({
      iso_3166_1: z.string(),
      name: z.string(),
    })
  ),
  release_date: z.string(),
  revenue: z.number().default(0),
  runtime: z.number().default(0),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean().default(true),
  vote_average: z.number().default(0),
  vote_count: z.number().default(0),
});

const PersonDetailSchema = z.object({
  adult: z.boolean().default(true),
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string(),
  deathday: z.string(),
  gender: z.number().default(0),
  homepage: z.string(),
  id: z.number().default(0),
  imdb_id: z.string(),
  known_for_department: z.string(),
  name: z.string(),
  place_of_birth: z.string(),
  popularity: z.number().default(0),
  profile_path: z.string(),
});

type TVDetailResponse = z.infer<typeof TVDetailSchema>;
type MovieDetailResponse = z.infer<typeof MovieDetailSchema>;
type PersonDetailResponse = z.infer<typeof PersonDetailSchema>;
type DetailResponse = TVDetailResponse & MovieDetailResponse & PersonDetailResponse;
type MediaType = "movie" | "tv" | "person";

export { TrendingSchema, TVDetailSchema, MovieDetailSchema, PersonDetailSchema };
export type {
  TrendingResponse,
  TrendingResults,
  TrendingResult,
  TimeWindow,
  TVDetailResponse,
  MovieDetailResponse,
  DetailResponse,
  MediaType,
};
