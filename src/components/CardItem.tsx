import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

type CardItemsProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const CardItem = ({ id, name, price, imageUrl }: CardItemsProps) => {
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
      bgGradient='linear(to-tr, facebook.300, facebook.700)'
      color='white'
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
      <Text fontWeight={900} fontSize={20} w='full' align='end' px={6}>${price}</Text>
      <Button w='full' colorScheme='facebook' bg='facebook.500' textTransform='uppercase' color='white'>Add to my cart</Button>
    </Box>
  );
};

export default CardItem;
