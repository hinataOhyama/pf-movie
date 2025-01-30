"use client";

import { TMDBImagePath } from "@/services/tmdb/const";
import {
  MovieDiscoverResult,
  TrendingResult,
  TVDiscoverResult,
} from "@/services/tmdb/schema";
import { Box, Flex, Icon, Image, Text } from "@yamada-ui/react";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

type CardProps = {
  result: TrendingResult & MovieDiscoverResult & TVDiscoverResult;
};

const Card = ({ result }: CardProps) => {
  return (
    <Link href={`/${result?.media_type}/${result?.id}`}>
      <Box
        position={"relative"}
        transform={"scale(1)"}
        _hover={{
          transform: { base: "scale(1.06)", md: "scale(1)x" },
          transition: "transform 0.2s ease-in-out",
          zIndex: "10",
          "& .overlay": {
            opacity: 1,
          },
        }}
      >
        <Image
          src={`${TMDBImagePath}/${result?.poster_path}`}
          alt={result?.title || result?.name}
          w={"full"}
        />
        <Box
          className="overlay"
          pos={"absolute"}
          p="2"
          bottom={"0"}
          left={"0"}
          w={"full"}
          h={"fit-content"}
          bg="rgba(0,0,0,0.9)"
          opacity={"0"}
          transition={"opacity 0.3s ease-in-out"}
        >
          <Text textAlign={"center"} bg={"transparent"}>
            {result?.title || result?.name}
          </Text>
          <Text
            textAlign={"center"}
            fontSize={"small"}
            color={"green.300"}
            bg={"transparent"}
          >
            {new Date(
              result?.release_date || result?.first_air_date
            ).getFullYear() || "N/A"}
          </Text>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            mt="2"
            bg={"transparent"}
          >
            <Icon as={FaStar} fontSize={"small"} />
            <Text bg={"transparent"}>{result?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
