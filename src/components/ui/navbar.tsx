"use client";

import { AuthContext } from "@/components/feature/auth/provider";
import { useAuth } from "@/components/feature/auth/use-auth";
import {
  Avatar,
  Box,
  Container,
  // Button,
  // Drawer,
  // DrawerBody,
  // DrawerFooter,
  // DrawerHeader,
  // DrawerProps,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth() as AuthContext;
  const {
    // open,
    onOpen,
    // onClose
  } = useDisclosure();
  const pathname = usePathname();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      console.log("success");
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <Box as={"header"} py="4" boxShadow={"inset 0 -1px 0 0 #333"}>
      <Container maxW={"6xl"} mx={"auto"} p={0} py={"0"} px={"4"}>
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
            <Link href="/">
              <Text
                color={`${pathname === "/" ? "blue.500" : "gray.400"}`}
                _hover={{
                  color: pathname === "/" ? "blue.500" : "white",
                }}
              >
                Home
              </Text>
            </Link>
            <Link href="/movies">
              <Text
                color={`${pathname === "/movies" ? "blue.500" : "gray.400"}`}
                _hover={{
                  color: pathname === "/movies" ? "blue.500" : "white",
                }}
              >
                Movies
              </Text>
            </Link>
            <Link href="/tv">
              <Text
                color={`${pathname === "/tv" ? "blue.500" : "gray.400"}`}
                _hover={{
                  color: pathname === "/tv" ? "blue.500" : "white",
                }}
              >
                TV
              </Text>
            </Link>
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
            <IconButton
              onClick={onOpen}
              icon={<GiHamburgerMenu />}
              bg={"black"}
              _hover={{ bg: "black" }}
            />
            {/* TODO: Bug fix */}
            {/* <Drawer open={open} onClose={onClose}>
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
            </Drawer> */}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
