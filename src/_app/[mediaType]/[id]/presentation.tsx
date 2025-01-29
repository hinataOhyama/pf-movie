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
  useNotice,
} from "@yamada-ui/react";
import { TMDBImagePath, TMDBImageOriginalPath } from "@/services/tmdb/const";

import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from "@/utils/helpers";
import {
  CreditResponse,
  DetailResponse,
  VideoResponse,
} from "@/services/tmdb/schema";
import { DetailsPageParams } from "@/app/[mediaType]/[id]/page";
import { FaCalendar, FaTimes, FaCheckCircle } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import Video from "@/components/ui/video";
import { useAuth } from "@/components/feature/auth/use-auth";
import { AuthContext } from "@/components/feature/auth/provider";
import { useFirestore } from "@/services/firestore/use-firestore";
import { useEffect, useState } from "react";
import { WatchList } from "@/services/firestore/schema";

type DetailsPresentationProps = {
  detailsData: DetailResponse;
  creditsData: CreditResponse;
  videosData: VideoResponse;
  params: Awaited<DetailsPageParams["params"]>;
};

const DetailsPresentation = ({
  detailsData,
  creditsData,
  videosData,
  params,
}: DetailsPresentationProps) => {
  const { user } = useAuth() as AuthContext;
  const { addToWatchList, checkIfInWatchList, removeFromWatchList } =
    useFirestore();
  const notice = useNotice();

  const title = detailsData?.title || detailsData?.name;
  const releaseDate =
    params?.mediaType === "tv"
      ? detailsData?.first_air_date
      : detailsData?.release_date;

  const [isInWatchList, setIsInWatchList] = useState(false);

  const handleSaveToWatchList = async () => {
    if (!user) {
      notice({
        title: "Login to add to watchlist",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const data: WatchList = {
      id: detailsData?.id,
      title: detailsData?.title || detailsData?.name,
      type: params?.mediaType,
      poster_path: detailsData?.poster_path,
      release_date: detailsData?.release_date || detailsData?.first_air_date,
      vote_average: detailsData?.vote_average,
      overview: detailsData?.overview,
    };

    const dataId = detailsData?.id?.toString();
    await addToWatchList(user?.uid, dataId, data);
    const isSetToWatchList = await checkIfInWatchList(user?.uid, dataId);
    setIsInWatchList(isSetToWatchList);
  };

  useEffect(() => {
    if (!user) {
      setIsInWatchList(false);
      return;
    }
    console.log(user?.uid, params?.id);

    checkIfInWatchList(user?.uid, params?.id.toString()).then((data) => {
      setIsInWatchList(data);
    });
  }, [params?.id, user, checkIfInWatchList]);

  const handleRemoveFromWatchList = async () => {
    await removeFromWatchList(user?.uid, params?.id.toString());
    const isSetToWatchList = await checkIfInWatchList(
      user?.uid,
      params?.id.toString()
    );
    setIsInWatchList(isSetToWatchList);
  };

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
                  <CircleProgressLabel fontSize={"lg"} bg={"transparent"}>
                    {ratingToPercentage(detailsData?.vote_average)}{" "}
                    <Box as="span" fontSize={"10px"}>
                      %
                    </Box>
                  </CircleProgressLabel>
                </CircleProgress>
                <Text display={{ base: "initial", md: "none" }}>
                  User Score
                </Text>
                {isInWatchList ? (
                  <Button
                    startIcon={<FaCheckCircle />}
                    colorScheme="green"
                    variant={"outline"}
                    color={"gray.400"}
                    _hover={{ color: "black", bg: "white" }}
                    onClick={handleRemoveFromWatchList}
                  >
                    In watchlist
                  </Button>
                ) : (
                  <Button
                    startIcon={<CgAdd color="gray.400" />}
                    variant={"outline"}
                    color={"gray.400"}
                    _hover={{ color: "black", bg: "white" }}
                    onClick={handleSaveToWatchList}
                  >
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

        <Heading
          as="h2"
          fontSize={"md"}
          textTransform={"uppercase"}
          mt="10"
          mb="5"
        >
          Videos
        </Heading>
        <Video id={videosData?.results[0]?.key} />
        <Flex mt="5" mb="10" overflowX={"scroll"} gap={"5"}>
          {videosData &&
            videosData?.results.map((videoItem) => (
              <Box key={videoItem?.id} minW={"290px"}>
                <Video id={videoItem?.key} small />
                <Text fontSize={"sm"} fontWeight={"bold"} mt="2" lineClamp={2}>
                  {videoItem?.name}{" "}
                </Text>
              </Box>
            ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default DetailsPresentation;
