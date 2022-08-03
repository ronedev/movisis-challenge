import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import shoppingCartImage from "/images/shopping-cart.png";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Box
      bg={"facebook.300"}
      shadow={"xl"}
      m={"auto"}
      color={"white"}
      p={4}
      w="100%"
      as="nav"
      position='sticky'
      top={0}
    >
      <Flex justifyContent={"space-between"}>
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

          />
          <Button style={{ position: "relative" }} variant='outline'>
            <Img src={shoppingCartImage} alt="shopping cart" w={10} />
            <Box
              style={{
                width: '1rem',
                height: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: "absolute",
                top: -5,
                left: 35,
                backgroundColor: "red",
                borderRadius: "50%",
                fontSize: '.8rem'
              }}
            >
              1
            </Box>
          </Button>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default Navbar;
