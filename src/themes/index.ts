import {
  extendConfig,
  extendTheme,
  ThemeConfig,
  UsageTheme,
} from "@yamada-ui/react";

const customTheme: UsageTheme = {};

const customConfig: ThemeConfig = { initialColorMode: "dark" };

export const config = extendConfig(customConfig);
export const theme = extendTheme(customTheme)();
