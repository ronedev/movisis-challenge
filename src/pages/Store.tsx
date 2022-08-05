import {
  Box,
  Container,
  Grid
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import FilterAside from "../components/FilterAside";
import { useItemsContext } from "../context/ItemsContext";
import { cardItem } from "../interfaces/interfaces";

const Store = () => {
  const {items, isFiltering} = useItemsContext()
  const [storeItems, setStoreItems] = useState<cardItem[]>(items)

  useEffect(()=>{
    setStoreItems(items)
  }, [isFiltering])
  return (
    <Box display={{md: 'flex'}} w='100%' >
      <FilterAside />
      <Container maxW="100%">
        <Grid
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
          my={4}
        >
          {storeItems.map((item) => (
            <CardItem key={item.id} {...item} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Store;
