import { Box, Container, Grid } from "@chakra-ui/react";
import CardItem from "../components/CardItem";
import storeItems from "../data/items.json";

type Props = {};

const Store = (props: Props) => {
  return (
    <>
      <Container maxW='100%'>
        <h1>Store</h1>
        <Grid
          w="90%"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap="6"
          justifyItems="center"
        >
          {storeItems.map((item) => (
            <CardItem {...item} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Store;
