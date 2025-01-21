"use client";

import {
  Box,
  Container,
  Flex,
  Icon,
  IconButton,
} from "@yamada-ui/react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  return (
    <Box py="4" mb="2">
      <Container maxW={"container.xl"}>
        <Flex justifyContent={"space-between"}>
          <Link href={"/"}>
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"red"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              PF Movie
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
          >
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/shows">TV Shows</Link>
            <Link href="/search">
              <Icon as={FaSearch} fontSize={"xl"} />
            </Link>
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: "flex", md: "none" }}
            alignItems={"center"}
            gap="4"
          >
            <Link href="/search">
              <Icon as={FaSearch} fontSize={"xl"} />
            </Link>
            <IconButton icon={<GiHamburgerMenu />} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;