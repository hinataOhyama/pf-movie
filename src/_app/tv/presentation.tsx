"use client";

import Card from "@/components/card";
import Pagination from "@/components/pagination";
import { fetchTV } from "@/services/tmdb/api";
import {
  SortBy,
  TVDiscoverResponse,
  TVDiscoverResult,
} from "@/services/tmdb/schema";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Option,
  Select,
  Skeleton,
} from "@yamada-ui/react";
import { startTransition, useActionState, useState } from "react";

type TVPresentationProps = {
  tvData: TVDiscoverResponse;
};

const TVPresentation = ({ tvData }: TVPresentationProps) => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [_tvData, _setTVData, isPending] = useActionState(
    () =>
      fetchTV(activePage, sortBy)
        .then((res) => {
          setTotalPages(res.total_pages);
          return res;
        })
        .catch((err) => {
          console.error("Error fetching movies", err);
          return null;
        })
        .finally(() => {}),
    tvData
  );

  return (
    <Container maxW={"6xl"} mx={"auto"} py={"0"} px={"4"}>
      <Flex alignItems={"baseline"} gap={"4"} my="10">
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select
          w={"130px"}
          defaultValue="popularity.desc"
          onChange={(value) => {
            setActivePage(1);
            setSortBy(value as SortBy);
            startTransition(() => _setTVData());
          }}
        >
          <Option value="popularity.desc">Popular</Option>
          <Option value="vote_average.desc&vote_count.gte=1000">
            Top Rated
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
        {_tvData &&
          _tvData?.results.map((result: TVDiscoverResult, i) =>
            isPending ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card
                key={result.id}
                result={{
                  ...result,
                  media_type: "tv",
                  title: result.name,
                  original_title: result.original_name,
                  release_date: result.first_air_date,
                  video: false,
                  adult: false,
                }}
              />
            )
          )}
      </Grid>

      <Pagination
        activePage={activePage}
        totalPages={totalPages}
        setActivePage={setActivePage}
        _setData={_setTVData}
      />
    </Container>
  );
};

export default TVPresentation;
