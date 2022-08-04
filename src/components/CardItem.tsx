import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";

type CardItemsProps = {
    item: {
        id: number;
        name: string;
        price: number;
        imageUrl: string;
    }
};

const CardItem = ({ item }: CardItemsProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(item.id);

  return (
    <Box
      p={5}
      shadow="xl"
      w="xs"
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
        {item.name}
      </Heading>
      <Image
        src={item.imageUrl}
        alt={`Descriptive image of the shoes ${item.name}`}
        height={200}
        fallbackSrc="https://www.azendportafolio.com/static/img/not-found.png"
      />
      <Text fontWeight={900} fontSize={20} w="full" align="end" px={6}>
        ${item.price}
      </Text>

      {quantity < 1 ? (
        <Button
          w="full"
          colorScheme="facebook"
          bg="facebook.500"
          textTransform="uppercase"
          color="white"
          onClick={() => increaseCartQuantity(item.id)}
        >
          Add to my cart
        </Button>
      ) : (
        <Grid>
          <Button
            w="full"
            colorScheme="facebook"
            bg="facebook.500"
            textTransform="uppercase"
            color="white"
            onClick={()=> removeFromCart(item.id)}
          >
            Remove from my cart
          </Button>
          <Flex alignItems='center' justifyContent='space-evenly' mt={3}>
            <Button onClick={()=>decreaseCartQuantity(item.id)}>-</Button>
            <Text fontWeight={900} fontSize={13}>{quantity}</Text>
            <Button onClick={()=>increaseCartQuantity(item.id)}>+</Button>
          </Flex>
        </Grid>
      )}
    </Box>
  );
};

export default CardItem;
