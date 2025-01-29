import { z } from "zod";

export const WatchListSchema = z.object({
  id: z.number(),
  title: z.string(),
  type: z.enum(["movie", "tv"]),
  poster_path: z.string(),
  release_date: z.string(),
  vote_average: z.number(),
  overview: z.string(),
});

export type WatchList = z.infer<typeof WatchListSchema>;
