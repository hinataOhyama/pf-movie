type VideoProps = {
  id: string;
  small?: boolean;
};

const Video = ({ id, small = false }: VideoProps) => {
  return (
    <iframe
      width="100%"
      height={small ? "150" : "500"}
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

export default Video;
