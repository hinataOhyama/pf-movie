import { ComponentStyle } from "@yamada-ui/react";

export const Menu: ComponentStyle = {
  baseStyle: {
    content: {
      bg: ["black", "black"],
      borderColor: ["white", "white"],
    },
    item: {
      borderColor: ["white", "white"],
      borderRadius: "md",
      _active: {
        bg: ["blackAlpha.700", "blackAlpha.700"],
      },
      _hover: {
        bg: ["blackAlpha.700", "blackAlpha.700"],
        _focus: {
          bg: ["blackAlpha.700", "blackAlpha.700"],
        },
      },
    },
  },
};