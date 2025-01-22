"use client";

import { config, theme } from "@/themes";
import { ColorModeScript, UIProvider } from "@yamada-ui/react";

type HomeProviderProps = {
  children: React.ReactNode;
};

const HomeProvider = ({ children }: HomeProviderProps) => {
  return (
    <>
      <ColorModeScript  />
      <UIProvider theme={theme} config={config} >
        {children}
      </UIProvider>
    </>
  );
};

export default HomeProvider;
