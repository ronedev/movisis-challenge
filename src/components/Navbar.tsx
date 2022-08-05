import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useItemsContext } from "../context/ItemsContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartModal from "./CartModal";
import shoppingCartImage from "/images/shopping-cart.png";

const Navbar = () => {
  const { cartQuantity } = useShoppingCart();
  const { filterByName, changeFiltering } = useItemsContext();

  const [searchByName, setSearchByName] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    filterByName(searchByName);
    changeFiltering();
  }, [searchByName]);

  return (
    <>
      <CartModal isOpen={isOpen} onClose={onClose} />
      <Box
        bg={"facebook.300"}
        shadow={"xl"}
        color={"white"}
        w="100%"
        as="nav"
        position="sticky"
        top={0}
        zIndex={100}
      >
        <Flex justifyContent={"space-between"} p={4}>
          <Flex gap={15} alignItems="center">
            <h2>Logo</h2>
            <Flex gap={4}>
              <Button to="/" as={NavLink} fontSize={20} variant="link">
                Home
              </Button>
              <Button to="/store" as={NavLink} fontSize={20} variant="link">
                Store
              </Button>
            </Flex>
          </Flex>
          <InputGroup w={"lg"} gap={6}>
            <InputLeftElement children={<Search2Icon />} pointerEvents="none" />
            <Input
              type="text"
              name="search"
              placeholder="Search product"
              borderColor="gray.400"
              color="white"
              _hover={{ borderColor: "white" }}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            <Button style={{ position: "relative" }} variant="outline" onClick={onOpen}>
              <Img src={shoppingCartImage} alt="shopping cart" w={10} />
              {cartQuantity > 0 && (
                <Box
                  style={{
                    width: "1rem",
                    height: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: -5,
                    left: 35,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    fontSize: ".8rem",
                  }}
                >
                  {cartQuantity}
                </Box>
              )}
            </Button>
          </InputGroup>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
