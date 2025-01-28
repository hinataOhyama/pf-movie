import React from "react";
import { fetchCredits, fetchDetails } from "@/services/tmdb/api";
import DetailsPresentation from "./presentation";
import { DetailsPageParams } from "@/app/[mediaType]/[id]/page";

type DetailsContainerProps = DetailsPageParams;

const DetailsContainer = async ({ params }: DetailsContainerProps) => {
  const [detailsData, creditsData] = await Promise.all([
    fetchDetails(params.mediaType, params.id),
    fetchCredits(params.mediaType, params.id),
  ]);

  return (
    <DetailsPresentation
      detailsData={detailsData}
      creditsData={creditsData}
      params={params}
    />
  );
};

export default DetailsContainer;
