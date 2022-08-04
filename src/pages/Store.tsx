import {
  Box,
  Container,
  Grid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import FilterAside from "../components/FilterAside";
import { useItemsContext } from "../context/ItemsContext";

const Store = () => {
  const {items, isFiltering} = useItemsContext()
  const [storeItems, setStoreItems] = useState(items)

  useEffect(()=>{
    setStoreItems(items)
  }, [isFiltering])
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
          {storeItems.map((item) => (
            <CardItem key={item.id} item={item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Store;
