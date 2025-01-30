import { useAuth } from "@/components/feature/auth/use-auth";
import { WatchList } from "@/services/firestore/schema";
import { useFirestore } from "@/services/firestore/use-firestore";
import { TMDBImagePath } from "@/services/tmdb/const";
import { MediaType } from "@/services/tmdb/schema";
import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
} from "@yamada-ui/react";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

type WatchListCardProps = {
  item: WatchList;
  type: MediaType;
  setWatchList: React.Dispatch<React.SetStateAction<WatchList[]>>;
};

const WatchListCard = ({ item, type, setWatchList }: WatchListCardProps) => {
  const { removeFromWatchList } = useFirestore();
  const auth = useAuth();

  const handleRemoveClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    removeFromWatchList(auth?.user?.uid, item.id.toString()).then(() => {
      setWatchList((prev: WatchList[]) =>
        prev.filter((el) => el.id !== item.id)
      );
    });
  };

  return (
    <Link href={`/${type}/${item.id}`}>
      <Flex gap="4">
        <Box position={"relative"} w={"150px"}>
          <Image
            src={`${TMDBImagePath}/${item.poster_path}`}
            alt={item.title}
            height={"200px"}
            minW={"150px"}
            objectFit={"cover"}
          />
          <IconButton
            aria-label="Remove from watchList"
            icon={<FaCheck />}
            size={"sm"}
            colorScheme="green"
            position={"absolute"}
            zIndex={"99"}
            top="2px"
            left={"2px"}
            onClick={handleRemoveClick}
          />
        </Box>

        <Box>
          <Heading fontSize={{ base: "2xl", md: "xl" }} lineClamp={1}>
            {item?.title}
          </Heading>
          <Heading fontSize={"sm"} color={"green.200"} mt="2">
            {new Date(item?.release_date).getFullYear() || "N/A"}
          </Heading>
          <Flex alignItems={"center"} gap={2} mt="4">
            <Icon as={FaStar} fontSize={"small"} />
            <Text textAlign={"center"} fontSize="small">
              {item?.vote_average?.toFixed(1)}
            </Text>
          </Flex>
          <Text mt="4" fontSize={{ base: "sm", md: "xs" }} lineClamp={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default WatchListCard;
