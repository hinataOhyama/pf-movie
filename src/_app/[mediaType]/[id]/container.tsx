import React from "react";
import { fetchDetails } from "@/services/tmdb/api";
import DetailsPresentation from "./presentation";
import { DetailsPageParams } from "@/app/[mediaType]/[id]/page";

type DetailsContainerProps = DetailsPageParams;

const DetailsContainer = async ({ params }: DetailsContainerProps) => {
  const detailsData = await fetchDetails(params.mediaType, params.id);

  return <DetailsPresentation detailsData={detailsData} params={params} />;
};

export default DetailsContainer;
