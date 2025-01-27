import DetailsContainer from "@/_app/[mediaType]/[id]/container";
import { MediaType } from "@/services/tmdb/schema";

export type DetailsPageParams = {
  params: {
    mediaType: MediaType;
    id: number;
  };
};

const DetailsPage = ({ params }: DetailsPageParams) => {
  return <DetailsContainer params={params} />;
};

export default DetailsPage;
