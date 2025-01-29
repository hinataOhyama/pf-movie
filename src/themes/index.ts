import {
  extendConfig,
  extendTheme,
  ThemeConfig,
  UsageTheme,
} from "@yamada-ui/react";
import { components } from "./components";

const customTheme: UsageTheme = {
  components,
};

const customConfig: ThemeConfig = { initialColorMode: "dark" };

export const config = extendConfig(customConfig);
export const theme = extendTheme(customTheme)();
