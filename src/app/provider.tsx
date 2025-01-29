"use client";

import { config, theme } from "@/themes";
import { UIProvider } from "@yamada-ui/react";

type HomeProviderProps = {
  children: React.ReactNode;
};

const HomeProvider = ({ children }: HomeProviderProps) => {
  return (
    <>
      <UIProvider theme={theme} config={config}>
        {children}
      </UIProvider>
    </>
  );
};

export default HomeProvider;
