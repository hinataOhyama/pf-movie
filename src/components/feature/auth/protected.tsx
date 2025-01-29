"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "./use-auth";

type AuthProtectedProps = {
  children: React.ReactNode;
};

const AuthProtected = ({ children }: AuthProtectedProps) => {
  const auth = useAuth();
  const router = useRouter();

  if (!auth) return null;

  const { user, isLoading } = auth;

  if (isLoading) return null;

  if (!user) {
    router.push("/");
    router.refresh();
  }

  return <>{user && children}</>;
};

export default AuthProtected;
