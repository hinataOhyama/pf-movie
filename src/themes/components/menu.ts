import { ComponentStyle } from "@yamada-ui/react";

export const Menu: ComponentStyle = {
  baseStyle: {
    content: {
      bg: ["black", "white"],
      borderColor: ["white", "whiteAlpha.100"],
    },
    item: {
      borderColor: ["white", "whiteAlpha.100"],
      borderRadius: "md",
      _active: {
        bg: ["blackAlpha.700", "whiteAlpha.200"],
      },
      _hover: {
        bg: ["blackAlpha.700", "whiteAlpha.100"],
        _focus: {
          bg: ["blackAlpha.700", "whiteAlpha.50"],
        },
      },
    },
  },
};