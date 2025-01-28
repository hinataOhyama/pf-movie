"use client";

import {
  Badge,
  Box,
  Button,
  CircleProgress,
  CircleProgressLabel,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@yamada-ui/react";
import { TMDBImagePath, TMDBImageOriginalPath } from "@/services/tmdb/const";

import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "@/utils/helpers";
import { CreditResponse, DetailResponse } from "@/services/tmdb/schema";
import { DetailsPageParams } from "@/app/[mediaType]/[id]/page";
import { FaCalendar, FaTimes, FaCheckCircle } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";

type DetailsPresentationProps = {
  detailsData: DetailResponse;
  creditsData: CreditResponse;
  params: DetailsPageParams["params"];
};

const DetailsPresentation = ({
  detailsData,
  creditsData,
  params,
}: DetailsPresentationProps) => {
  const title = detailsData?.title || detailsData?.name;
  const releaseDate =
    params?.mediaType === "tv"
      ? detailsData?.first_air_date
      : detailsData?.release_date;

  return (
    <Box>
      <Box
        background={`linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(${TMDBImageOriginalPath}/${detailsData?.backdrop_path})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        w={"100%"}
        h={{ base: "500px", md: "auto" }}
        py={"2"}
        zIndex={"-1"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Container maxW={"6xl"}>
          <Flex
            alignItems={"center"}
            gap="10"
            flexDirection={{ base: "row", md: "column" }}
          >
            <Image
              height={"450px"}
              borderRadius={"sm"}
              src={`${TMDBImagePath}/${detailsData?.poster_path}`}
              alt={title}
            />
            <Box>
              <Heading fontSize={"3xl"}>
                {title}{" "}
                <Text as="span" fontWeight={"normal"} color={"gray.400"}>
                  {new Date(releaseDate).getFullYear()}
                </Text>
              </Heading>

              <Flex alignItems={"center"} gap={"4"} mt={1} mb={5}>
                <Flex alignItems={"center"}>
                  <Icon as={FaCalendar} mr={2} color={"gray.400"} />
                  <Text fontSize={"sm"}>
                    {new Date(releaseDate).toLocaleDateString("en-US")} (US)
                  </Text>
                </Flex>
                {params?.mediaType === "movie" && (
                  <>
                    <Box>*</Box>
                    <Flex alignItems={"center"}>
                      <Icon as={FaTimes} mr="2" color={"gray.400"} />
                      <Text fontSize={"sm"}>
                        {minutesTohours(detailsData?.runtime)}
                      </Text>
                    </Flex>
                  </>
                )}
              </Flex>
              <Flex alignItems={"center"} gap={"4"}>
                <CircleProgress
                  value={Number(ratingToPercentage(detailsData?.vote_average))}
                  bg={"gray.800"}
                  borderRadius={"full"}
                  p={"0.5"}
                  boxSize={"70px"}
                  color={resolveRatingColor(detailsData?.vote_average)}
                  textDecorationThickness={"6px"}
                >
                  <CircleProgressLabel fontSize={"lg"}>
                    {ratingToPercentage(detailsData?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircleProgressLabel>
                </CircleProgress>
                <Text display={{ base: "initial", md: "none" }}>
                  User Score
                </Text>
                {false ? (
                  <Button
                    startIcon={<FaCheckCircle />}
                    colorScheme="green"
                    variant={"outline"}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button startIcon={<CgAdd />} variant={"outline"}>
                    Add to watchlist
                  </Button>
                )}
              </Flex>
              <Text
                color={"gray.400"}
                fontSize={"sm"}
                fontStyle={"italic"}
                my="5"
              >
                {detailsData?.tagline}
              </Text>
              <Heading fontSize={"xl"} mb={"3"}>
                Overview
              </Heading>
              <Text fontSize={"md"} mb={"3"}>
                {detailsData?.overview}
              </Text>
              <Flex mt="6" gap="2">
                {detailsData?.genres?.map((genre) => (
                  <Badge key={genre?.id} p="1">
                    {genre?.name}
                  </Badge>
                ))}
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Container maxW={"6xl"} pb="10" mx={"auto"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"} mt="10">
          Cast
        </Heading>
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
          {creditsData?.cast.length === 0 && <Text>No cast found</Text>}
          {creditsData?.cast &&
            creditsData?.cast?.map((castItem) => (
              <Box key={castItem?.id} minW={"150px"}>
                <Image
                  src={`${TMDBImagePath}/${castItem?.profile_path}`}
                  alt={castItem?.name}
                  w={"100%"}
                  height={"225px"}
                  objectFit={"cover"}
                  borderRadius={"sm"}
                />
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPresentation;
