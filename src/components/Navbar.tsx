import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { NavLink, useLocation } from "react-router-dom";
import { useItemsContext } from "../context/ItemsContext";
import { useLangContext } from "../context/LangContext";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CartModal from "./CartModal";
import shoppingCartImage from "/images/shopping-cart.png";

const Navbar = () => {
  const actualPage = useLocation();
  const { cartQuantity } = useShoppingCart();
  const { filterByName, changeFiltering } = useItemsContext();
  const { changeLang, actualLang } = useLangContext()

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
        <Flex justifyContent={"space-between"} p={4} gap={2}>
          <Flex gap={15} alignItems="center">
            <a href="/">
              <img
                src="/retrato.png"
                alt="logo"
                style={{maxWidth: '6rem'}}
              />
            </a>
            <Flex gap={4}>
              <Button
                to="/"
                as={NavLink}
                fontSize={{ base: 15, md: 20 }}
                variant="link"
              >
                <FormattedMessage id="navbarHome" defaultMessage='Home'/>
              </Button>
              <Button
                to="/store"
                as={NavLink}
                fontSize={{ base: 15, md: 20 }}
                variant="link"
              >
                <FormattedMessage id="navbarStore" defaultMessage='Store' />
              </Button>
            </Flex>
          </Flex>
          <Box display={{base: 'grid', md: 'flex'}} gap={2}>
            <InputGroup
              gap={{ base: 1, md: 6 }}
              justifyContent="end"
              alignItems="center"
              flexDirection={{ base: "column", md: "row" }}
            >
              {actualPage.pathname === "/store" && (
                <>
                  <InputLeftElement
                    children={<Search2Icon />}
                    pointerEvents="none"
                    pt={{ base: "2px", md: "40px" }}
                  />
                  <Input
                    type="text"
                    name="search"
                    maxW="15rem"
                    placeholder={actualLang === 'en-US' ? "Search product" : "Pesquisar produto"}
                    borderColor="gray.400"
                    color="white"
                    _hover={{ borderColor: "white" }}
                    onChange={(e) => setSearchByName(e.target.value)}
                    pl={8}
                  />
                </>
              )}
            </InputGroup>
            <Box display={{base:'grid', md:'flex'}} justifyContent="space-around" alignItems='center' w="100%" gap={2}>
              <Button
                style={{ position: "relative" }}
                variant="outline"
                onClick={onOpen}
              >
                <img src={shoppingCartImage} alt="shopping cart" style={{maxWidth: '180px', height: '30px'}} />
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
              <Select minW="6rem" maxW="10rem" onChange={(e)=> changeLang(e.target.value)}>
                <option value="en-US">En</option>
                <option value="pt-BR">Pt</option>
              </Select>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;
