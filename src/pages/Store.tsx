import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import storeItems from "../data/items.json";

type Props = {};

const Store = (props: Props) => {
  return (
    <>
      <h1>Store</h1>
      <Grid
        w='4xl'
        templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
        ]}
        gap={3}
      >
        {storeItems.map((item) => (
          <Box w="xs">{JSON.stringify(item)}</Box>
        ))}
      </Grid>
    </>
  );
};

export default Store;
