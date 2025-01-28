"use client";

import { Button, Flex, Text } from "@yamada-ui/react";
import { startTransition } from "react";

type PaginationProps = {
  activePage: number;
  totalPages: number;
  setActivePage: (page: number) => void;
  _setMoviesData: () => void;
};

const Pagination = ({
  activePage,
  totalPages,
  setActivePage,
  _setMoviesData,
}: PaginationProps) => {
  return (
    <Flex gap={"2"} alignItems={"center"}>
      <Flex gap={"2"} maxW={"250px"} my="10">
        <Button
          onClick={() => {
            setActivePage(activePage - 1);
            startTransition(() => _setMoviesData());
          }}
          disabled={activePage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => {
            setActivePage(activePage + 1);
            startTransition(() => _setMoviesData());
          }}
          disabled={activePage === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap="1">
        <Text>{activePage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  );
};

export default Pagination;
