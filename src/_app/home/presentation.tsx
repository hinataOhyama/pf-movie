"use client";

import Card from "@/components/ui/card";
import { fetchTrending } from "@/services/tmdb/api";
import {
  TimeWindow,
  TrendingResponse,
  TrendingResults,
} from "@/services/tmdb/schema";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Skeleton,
} from "@yamada-ui/react";
import React from "react";
import { Suspense, useActionState, startTransition } from "react";

type HomePresentationProps = {
  trendingData: TrendingResponse;
};

const HomePresentation = ({ trendingData }: HomePresentationProps) => {
  const [timeWindow, setTimeWindow] = React.useState<TimeWindow>("day");
  const [_trendingData, click] = useActionState(
    () => fetchTrending(timeWindow),
    trendingData
  );

  const _results: TrendingResults = _trendingData?.results;

  return (
    <Container maxW={"6xl"} mx={"auto"} pb={"16"} px={"4"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as={"h2"} fontSize={"md"}>
          Trending
        </Heading>
        <Flex
          alignItems={"center"}
          gap={"2"}
          border={"1px solid teal"}
          borderColor={"gray.700"}
          borderRadius={"20px"}
        >
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "day" ? "gray.800" : ""}`}
            onClick={() => {
              setTimeWindow("day");
              startTransition(() => click());
            }}
          >
            Today
          </Box>
          <Box
            as="button"
            px="3"
            py="1"
            borderRadius={"20px"}
            bg={`${timeWindow === "week" ? "gray.800" : ""}`}
            onClick={() => {
              setTimeWindow("week");
              startTransition(() => click());
            }}
          >
            This Week
          </Box>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(5, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={"4"}
      >
        {_results &&
          _results?.map((_result) => (
            <Suspense
              fallback={<Skeleton w={"full"} height={300} key={_result?.id} />}
              key={_result?.id}
            >
              <Card
                result={{
                  ..._result,
                  first_air_date: "",
                  name: _result.title || "",
                  origin_country: [],
                  original_name: _result.original_title || "",
                }}
              />
            </Suspense>
          ))}
      </Grid>
    </Container>
  );
};

export default HomePresentation;
