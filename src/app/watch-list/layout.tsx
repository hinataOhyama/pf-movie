import AuthProtected from "@/components/feature/auth/protected";

type WatchListLayoutProps = {
  children: React.ReactNode;
};

const WatchListLayout = ({ children }: WatchListLayoutProps) => {
  return <AuthProtected>{children}</AuthProtected>;
};

export default WatchListLayout;
