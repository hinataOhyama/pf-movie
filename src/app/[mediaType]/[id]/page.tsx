import DetailsContainer from "@/_app/[mediaType]/[id]/container";
import { MediaType } from "@/services/tmdb/schema";

export type DetailsPageParams = {
  params: Promise<{
    mediaType: MediaType;
    id: number;
  }>;
};

const DetailsPage = async (props: DetailsPageParams) => {
  const pageParams = await props.params;
  const params = await pageParams;

  return <DetailsContainer params={params} />;
};

export default DetailsPage;
