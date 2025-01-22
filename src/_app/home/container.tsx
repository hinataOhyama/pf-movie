import React from "react";
import HomePresentation from "./presentation";
import { fetchTrending } from "@/services/tmdb/api";

const HomeContainer = async () => {
  const trendingData = await fetchTrending("day");

  return <HomePresentation results={trendingData.results} />;
};

export default HomeContainer;
