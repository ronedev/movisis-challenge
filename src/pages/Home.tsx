import { Box, Button, Flex, Grid, Heading, Link } from "@chakra-ui/react";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
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
        <Flex alignItems="center" justifyContent="space-between" m={{base:0, md: 4}} w='100%' flexDirection={{base: 'column', md:'row'}}>
          <Heading textAlign="center" color="white" textTransform='uppercase' fontSize={20}>
            <FormattedMessage id="homeTitle" defaultMessage='The best prices and quality' />
          </Heading>
          <Link href="/store" color='facebook.200' fontWeight={100}>
          <FormattedMessage id="homeStoreButton" defaultMessage='Visit the store' />
          </Link>
        </Flex>
        <Flex
          my={2}
          alignItems="center"
          justifyContent="center"
          position="relative"
          maxW="40rem"
        >
          {items.map((item, idx) => (
            <Box
              key={idx}
              id={idx.toString()}
              position="absolute"
              top={['20','10']}
              left={
                itemSelected === idx - 1
                  ? {base: '36%', md:"53%"}
                  : itemSelected === idx + 1
                  ? {base: '4%', md:'9%'}
                  : {base: '18%',md:"33%"}
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
              <CardItem {...item} />
            </Box>
          ))}
        </Flex>
      </Grid>
      <Flex gap={2}>
        {items.map((item, idx) => (
          <Box h={3} w={3} bgColor={itemSelected === idx ? 'facebook.700' : "facebook.100"} rounded="50%" cursor='pointer' onClick={()=>setItemSelected(idx)}></Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Home;
