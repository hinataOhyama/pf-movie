import React from "react";
import { fetchCredits, fetchDetails, fetchVideos } from "@/services/tmdb/api";
import DetailsPresentation from "./presentation";
import { DetailsPageParams } from "@/app/[mediaType]/[id]/page";

type DetailsContainerProps = {
  params: Awaited<Promise<DetailsPageParams["params"]>>;
};

const DetailsContainer = async ({ params }: DetailsContainerProps) => {
  const [detailsData, creditsData, videosData] = await Promise.all([
    fetchDetails(params.mediaType, params.id),
    fetchCredits(params.mediaType, params.id),
    fetchVideos(params.mediaType, params.id),
  ]);

  return (
    <DetailsPresentation
      detailsData={detailsData}
      creditsData={creditsData}
      videosData={videosData}
      params={params}
    />
  );
};

export default DetailsContainer;
