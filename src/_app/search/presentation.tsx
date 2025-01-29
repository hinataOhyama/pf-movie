"use client";

import Card from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import { fetchSearchMulti } from "@/services/tmdb/api";
import { SearchMultiResponse } from "@/services/tmdb/schema";
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Loading,
  Skeleton,
} from "@yamada-ui/react";
import { useActionState, useState } from "react";
import Form from "next/form";

const SearchPresentation = () => {
  const initialData: SearchMultiResponse = {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  };

  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchData, setSearchData, isPending] = useActionState(
    () =>
      fetchSearchMulti(searchValue, activePage)
        .then((res) => {
          setTotalPages(res.total_pages);
          return res;
        })
        .catch((err) => {
          console.error("Error fetching search data", err);
          return null;
        }),
    initialData
  );

  return (
    <Container maxW={"6xl"} mx={"auto"} py={"12"} px={"4"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Search
        </Heading>
      </Flex>

      <Form action={setSearchData}>
        <Input
          placeholder="Search movies, tv..."
          _placeholder={{ color: "gray.100" }}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </Form>

      {isPending && (
        <Flex justifyContent={"center"} mt="10">
          <Loading variant="oval" fontSize={"xl"} color="red" />
        </Flex>
      )}

      {searchData?.results.length === 0 && !isPending && (
        <Heading textAlign={"center"} as="h3" fontSize={"sm"} mt="10">
          No results found
        </Heading>
      )}

      <Grid
        templateColumns={{
          base: "repeat(5, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={"4"}
        mt="6"
      >
        {searchData &&
          searchData.results.length > 0 &&
          !isPending &&
          searchData.results.map((result, i) =>
            isPending ? (
              <Skeleton height={300} key={i} />
            ) : (
              <Card
                key={result?.id}
                result={{
                  ...result,
                  first_air_date: "",
                  name: result.title || "",
                  origin_country: [],
                  original_name: result.original_title || "",
                }}
              />
            )
          )}
      </Grid>

      {searchData && searchData.results.length > 0 && !isPending && (
        <Pagination
          activePage={activePage}
          totalPages={totalPages}
          setActivePage={setActivePage}
          _setData={setSearchData}
        />
      )}
    </Container>
  );
};

export default SearchPresentation;
