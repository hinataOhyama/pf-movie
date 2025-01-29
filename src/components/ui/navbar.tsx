"use client";

import { AuthContext } from "@/components/feature/auth/provider";
import { useAuth } from "@/components/feature/auth/use-auth";
import {
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@yamada-ui/react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth() as AuthContext;
  const { open, onOpen, onClose } = useDisclosure();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box as={"header"} py="4" boxShadow={"md"}>
      <Container maxW={"6xl"} mx={"auto"} py={"12"} px={"4"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Link href={"/"}>
            <Box
              fontSize={"2xl"}
              fontWeight={"bold"}
              color={"blue.500"}
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
            {user && (
              <Menu>
                <MenuButton>
                  <Avatar
                    bg={"blue.500"}
                    css={{ div: { background: "transparent" } }}
                    size={"sm"}
                    name={user?.email ?? ""}
                  />
                </MenuButton>
                <MenuList p="0">
                  <Link href="/watch-list">
                    <MenuItem bg="gray.800" _hover={{ bg: "gray.700" }}>
                      WatchList
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={logout}
                    bg="gray.800"
                    _hover={{ bg: "gray.700" }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <Avatar
                size={"sm"}
                bg={"gray.800"}
                as="button"
                onClick={handleGoogleLogin}
              />
            )}
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
            <IconButton onClick={onOpen} icon={<GiHamburgerMenu />} />
            <Drawer open={open} onClose={onClose}>
              <DrawerHeader>
                {user ? (
                  <Flex alignItems="center" gap="2">
                    <Avatar bg="red.500" size={"sm"} name={user?.email} />
                    <Box fontSize={"sm"}>
                      {user?.displayName || user?.email}
                    </Box>
                  </Flex>
                ) : (
                  <Avatar
                    size={"sm"}
                    bg="gray.800"
                    as="button"
                    onClick={handleGoogleLogin}
                  />
                )}
              </DrawerHeader>

              <DrawerBody>
                <Flex flexDirection={"column"} gap={"4"} onClick={onClose}>
                  <Link href="/">Home</Link>
                  <Link href="/movies">Movies</Link>
                  <Link href="/tv">TV</Link>
                  {user && (
                    <>
                      <Link href="/watch-list">WatchList</Link>
                      <Button
                        variant={"outline"}
                        colorScheme="red"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  )}
                </Flex>
              </DrawerBody>
              <DrawerFooter></DrawerFooter>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
