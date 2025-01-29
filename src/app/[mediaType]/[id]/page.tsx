import DetailsContainer from "@/_app/[mediaType]/[id]/container";
import { MediaType } from "@/services/tmdb/schema";

export type DetailsPageParams = {
  params: {
    mediaType: MediaType;
    id: number;
  };
};

const DetailsPage = async ({ params }: DetailsPageParams) => {
  const fetchParams = await params;

  return <DetailsContainer params={fetchParams} />;
};

export default DetailsPage;
