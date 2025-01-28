import { fetchTV } from "@/services/tmdb/api";
import TVPresentation from "./presentation";

const TVContainer = async () => {
  const tvData = await fetchTV(1, "popularity.desc");

  return <TVPresentation tvData={tvData}/>;
};

export default TVContainer;
