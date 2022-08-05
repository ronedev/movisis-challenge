import { Box, Button, Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import CardItem from "../components/CardItem";
import { useItemsContext } from "../context/ItemsContext";

const Home = () => {
  const [itemSelected, setItemSelected] = useState<number>(1);

  const { items } = useItemsContext();

  const handlers = useSwipeable({
    onSwipedLeft: (e) =>
      itemSelected !== items.length - 1
        ? setItemSelected((prev) => prev + 1)
        : null,
    onSwipedRight: (e) =>
      itemSelected !== 0 ? setItemSelected((prev) => prev - 1) : null,
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <Box
      bgGradient="linear(to-tr, facebook.300, facebook.700)"
      w="100%"
      h="90vh"
      display="grid"
      alignContent="space-between"
      justifyItems="center"
      pt={4}
      pb={{base: '40', md: '10'}}
    >
      <Grid>
        <Flex alignItems="center" justifyContent="space-between" m={4}>
          <Heading textAlign="center" color="white">
            The best prices and quality
          </Heading>
          <Button onClick={()=> location.href = '/store'} variant="ghost" fontWeight={100}>
            Visit the store
          </Button>
        </Flex>
        <Flex
          my={2}
          alignItems="center"
          justifyContent="center"
          position="relative"
          w="40rem"
        >
          {items.map((item, idx) => (
            <Box
              key={idx}
              id={idx.toString()}
              position="absolute"
              top={['20','10']}
              left={
                itemSelected === idx - 1
                  ? "45%"
                  : itemSelected === idx + 1
                  ? "5%"
                  : "25%"
              }
              opacity={
                itemSelected === idx
                  ? 1
                  : itemSelected === idx - 1 || itemSelected === idx + 1
                  ? 0.7
                  : 0
              }
              zIndex={itemSelected === idx ? 90 : 0}
              transform={itemSelected === idx ? "scale(105%)" : ""}
              transition="all .8s"
              cursor="grab"
              {...(idx === itemSelected && handlers)}
            >
              <CardItem item={item} />
            </Box>
          ))}
        </Flex>
      </Grid>
      <Flex gap={2}>
        {items.map(() => (
          <Box h={3} w={3} bgColor="facebook.100" rounded="50%"></Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
