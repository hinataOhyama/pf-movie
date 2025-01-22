"use client";

import { TMDBImagePath } from "@/services/tmdb/const";
import { TrendingResponse } from "@/services/tmdb/schema";
import { Container, Grid, Heading, Image, Skeleton } from "@yamada-ui/react";
import { Suspense } from "react";

type HomePresentationProps = {
  results: TrendingResponse["results"];
};

const HomePresentation = ({ results }: HomePresentationProps) => {
  return (
    <Container maxW={"container.lg"}>
      <Heading as={"h2"} fontSize={"md"}>
        Hello, World!
      </Heading>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={"4"}
      >
        {results &&
          results?.map((result) => (
            <Suspense
              fallback={<Skeleton height={300} key={result?.id} />}
              key={result?.id}
            >
              <Image src={`${TMDBImagePath}/${result?.poster_path}`} alt="" />
            </Suspense>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePresentation;
