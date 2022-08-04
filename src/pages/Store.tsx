import {
  Box,
  Container,
  Grid,
} from "@chakra-ui/react";
import CardItem from "../components/CardItem";
import FilterAside from "../components/FilterAside";
import { useItemsContext } from "../context/ItemsContext";

type Props = {};

const Store = (props: Props) => {
  const {items} = useItemsContext()

  console.log(items)
  return (
    <Box display={{md: 'flex'}} w='100%' >
      <FilterAside />
      <Container maxW="100%">
        <h1>Store</h1>
        <Grid
          w="100%"
          templateColumns={
            [
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap="6"
          justifyItems="center"
          alignContent='center'
        >
          {items.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Store;
