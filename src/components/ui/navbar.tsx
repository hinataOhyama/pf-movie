"use client";

import { AuthContext } from "@/components/feature/auth/provider";
import { useAuth } from "@/components/feature/auth/use-auth";
import {
  Avatar,
  Box,
  Container,
  Button,
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
  Text,
  useDisclosure,
  DrawerCloseButton,
} from "@yamada-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const { user, signInWithGoogle, logout } = useAuth() as AuthContext;
  const { open, onOpen, onClose } = useDisclosure();
  const pathname = usePathname();

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
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
              fontFamily={"monospace"}
            >
              PF-Movie
            </Box>
          </Link>

          {/* DESKTOP */}
          <Flex
            gap="6"
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
                <MenuList borderRadius={"md"}>
                  <Link href="/watch-list">
                    <MenuItem>WatchList</MenuItem>
                  </Link>
                  <MenuItem onClick={logout}>Logout</MenuItem>
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
              icon={<GiHamburgerMenu color="whiteAlpha.700" />}
              bg={"black"}
            />
            {/* TODO: Bug fix */}
            <Drawer open={open} onClose={onClose}>
              <DrawerCloseButton color="white" />
              <DrawerHeader pb={"4"} boxShadow={"inset 0 -1px 0 0 #333"}>
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
                <Flex
                  w={"full"}
                  flexDirection={"column"}
                  gap={"4"}
                  onClick={onClose}
                >
                  <Link href="/">
                    <Text
                      maxW={"xs"}
                      borderBottom={"1px solid"}
                      borderColor={"white"}
                      pb={"2"}
                      mx={"auto"}
                      textAlign={"center"}
                    >
                      Home
                    </Text>
                  </Link>
                  <Link href="/movies">
                    <Text
                      maxW={"xs"}
                      borderBottom={"1px solid"}
                      borderColor={"white"}
                      pb={"2"}
                      mx={"auto"}
                      textAlign={"center"}
                    >
                      Movies
                    </Text>
                  </Link>
                  <Link href="/tv">
                    <Text
                      maxW={"xs"}
                      borderBottom={"1px solid"}
                      borderColor={"white"}
                      pb={"2"}
                      mx={"auto"}
                      textAlign={"center"}
                    >
                      TV
                    </Text>
                  </Link>
                  {user && (
                    <Link href="/watch-list">
                      <Text
                        maxW={"xs"}
                        borderBottom={"1px solid"}
                        borderColor={"white"}
                        pb={"2"}
                        mx={"auto"}
                        textAlign={"center"}
                      >
                        WatchList
                      </Text>
                    </Link>
                  )}
                </Flex>
              </DrawerBody>
              <DrawerFooter>
                {user && (
                  <Button
                    variant={"outline"}
                    colorScheme="red"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                )}
              </DrawerFooter>
            </Drawer>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
