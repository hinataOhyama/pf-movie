"use client";

import Card from "@/components/ui/card";
import { fetchMovies } from "@/services/tmdb/api";
import {
  MovieDiscoverResponse,
  MovieDiscoverResult,
  SortBy,
} from "@/services/tmdb/schema";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Option,
  Pagination,
  Select,
  Skeleton,
  Text,
} from "@yamada-ui/react";
import { startTransition, useActionState, useState } from "react";

type MoviesPresentationProps = {
  moviesData: MovieDiscoverResponse;
};

const MoviesPresentation = ({ moviesData }: MoviesPresentationProps) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [_moviesData, _setMoviesData, isPending] = useActionState(
    () =>
      fetchMovies(activePage, sortBy)
        .then((res) => {
          setTotalPages(res.total_pages);
          return res;
        })
        .catch((err) => {
          console.error("Error fetching movies", err);
          return null;
        })
        .finally(() => {}),
    moviesData
  );

  return (
    <Container maxW={"6xl"} mx={"auto"} py={"0"} px={"4"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"lg"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          defaultValue="popularity.desc"
          onChange={(value) => {
            setActivePage(1);
            setSortBy(value as SortBy);
            startTransition(() => _setMoviesData());
          }}
          iconProps={{ color: "white" }}
          _hover={{ borderColor: "whiteAlpha.950" }}
          optionProps={{ bg: "black", _active: { bg: "black" } }}
        >
          <Option value="popularity.desc" bg="black">
            <Text>Popular</Text>
          </Option>
          <Option value="vote_average.desc&vote_count.gte=1000">
            <Text>Top Rated</Text>
          </Option>
        </Select>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(5, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={"4"}
      >
        {_moviesData &&
          _moviesData?.results.map((result: MovieDiscoverResult, i) =>
            isPending ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card
                key={result.id}
                result={{
                  ...result,
                  media_type: "movie",
                  name: "",
                  first_air_date: "",
                  origin_country: [],
                  original_name: "",
                }}
              />
            )
          )}
      </Grid>

      <Pagination
        total={totalPages}
        page={activePage}
        onChange={(page) => {
          setActivePage(page);
          startTransition(() => _setMoviesData());
        }}
        display={"flex"}
        justifyContent={"center"}
      />
    </Container>
  );
};

export default MoviesPresentation;
