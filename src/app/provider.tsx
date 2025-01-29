"use client";

import { AuthProvider } from "@/context/auth-provider";
import { config, theme } from "@/themes";
import { UIProvider } from "@yamada-ui/react";

type HomeProviderProps = {
  children: React.ReactNode;
};

const HomeProvider = ({ children }: HomeProviderProps) => {
  return (
    <>
      <UIProvider theme={theme} config={config}>
        <AuthProvider>{children}</AuthProvider>
      </UIProvider>
    </>
  );
};

export default HomeProvider;
