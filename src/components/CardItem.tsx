import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { cardItem } from "../interfaces/interfaces";


const CardItem = ({id, name, price, imageUrl, offer, createdAt}: cardItem) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Box
      p={5}
      shadow="xl"
      w={{ base: "s", md: "xs" }}
      rounded="xl"
      borderWidth="1px"
      as="article"
      display="grid"
      alignContent="center"
      justifyItems="center"
      gap={4}
      bgGradient="linear(to-tr, facebook.300, facebook.700)"
      color="white"
    >
      <Heading fontSize="xl" textAlign="center">
        {name}
      </Heading>
      <Image
        src={imageUrl}
        alt={`Descriptive image of the shoes ${name}`}
        height={200}
        fallbackSrc="https://www.azendportafolio.com/static/img/not-found.png"
      />
      <Text
        fontWeight={900}
        fontSize={20}
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        gap={3}
        px={6}
      >
        <Text textDecoration="line-through" fontWeight={600} fontSize={15}>
          {offer && `$ ${price} `}
        </Text>
        ${offer ? price - price * 0.1 : price}
      </Text>

      {quantity < 1 ? (
        //There are no items in the shopping cart
        <Button
          w="full"
          colorScheme="facebook"
          bg="facebook.500"
          textTransform="uppercase"
          color="white"
          onClick={() => increaseCartQuantity(id)}
        >
          Add to my cart
        </Button>
      ) : (
        //There are items in the shopping cart
        <Grid>
          <Button
            w="full"
            colorScheme="facebook"
            bg="facebook.500"
            textTransform="uppercase"
            color="white"
            onClick={() => removeFromCart(id)}
          >
            Remove from my cart
          </Button>
          <Flex alignItems="center" justifyContent="space-evenly" mt={3}>
            <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
            <Text fontWeight={900} fontSize={13}>
              {quantity}
            </Text>
            <Button onClick={() => increaseCartQuantity(id)}>+</Button>
          </Flex>
        </Grid>
      )}
    </Box>
  );
};

export default CardItem;
