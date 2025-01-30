"use client";

import { useAuth } from "@/components/feature/auth/use-auth";
import { WatchList } from "@/services/firestore/schema";
import { useFirestore } from "@/services/firestore/use-firestore";
import { Container, Flex, Grid, Heading, Loading } from "@yamada-ui/react";
import { useEffect, useState } from "react";
import WatchListCard from "./components/card";

const WatchListPresentation = () => {
  const { getWatchList } = useFirestore();
  const auth = useAuth();
  const [watchList, setWatchList] = useState<WatchList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth?.user?.uid) {
      getWatchList(auth?.user?.uid)
        .then((data) => {
          setWatchList(data as WatchList[]); // !Type assertion
        })
        .catch((err) => {
          console.log(err, "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [auth?.user?.uid, getWatchList]);

  return (
    <Container maxW={"6xl"} pt={"0"} pb={"12"} px={"4"} mx={"auto"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          WatchList
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={"center"} mt="10">
          <Loading fontSize={"xl"} color="red" />
        </Flex>
      )}
      {!isLoading && watchList?.length === 0 && (
        <Flex justify={"center"} mt="10">
          <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
            WatchList is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && watchList?.length > 0 && (
        <Grid
          templateColumns={{
            base: "1fr",
          }}
          gap={"4"}
        >
          {watchList?.map((watchItem) => (
            <WatchListCard
              key={watchItem?.id}
              item={watchItem}
              type={watchItem?.type}
              setWatchList={setWatchList}
            />
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchListPresentation;
