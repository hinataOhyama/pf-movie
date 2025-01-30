import { ComponentStyle } from "@yamada-ui/react";

export const Select: ComponentStyle = {
  baseStyle: {
    content: {
      bg: ["black", "black"],
      borderColor: ["white", "white"],
    },
    list: {
      borderColor: ["white", "white"],
      borderRadius: "md",
    },
    item: {
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