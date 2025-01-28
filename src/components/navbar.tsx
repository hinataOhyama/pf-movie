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
    <Box as={"header"} py="4" mb="2" boxShadow={"md"}>
      <Container maxW={"6xl"} mx={"auto"} py={"0"} px={"4"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link href={"/"}>
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"blue.400"}
              letterSpacing={"widest"}
              fontFamily={"mono"}
            >
              PF-Movie
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex
            gap="4"
            alignItems={"center"}
            display={{ base: "flex", md: "none" }}
          >
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/tv">TV</Link>
            <Link href="/search">
              <Icon as={FaSearch} fontSize={"xl"} />
            </Link>
          </Flex>

          {/* Mobile */}
          <Flex
            display={{ base: "none", md: "flex" }}
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