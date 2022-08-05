import {
  Box,
  Checkbox,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useItemsContext } from "../context/ItemsContext";

type priceRangeType = {
  from: number;
  to: number;
};

const FilterAside = () => {
  const {
    filterByPrice,
    filterByLowerOrHigherPrice,
    changeFiltering,
    filterByRecentOrOldestDate,
    filterByOffered,
  } = useItemsContext();

  const [priceRange, setPriceRange] = useState<priceRangeType>({
    from: 0,
    to: 0,
  });

  const [lowerOrHigherPrice, setLowerOrHigherPrice] = useState<string>("");
  const [recentOrOldest, setRecentOrOldest] = useState<string>("");
  const [filterOffered, setFilterOffered] = useState<boolean>(false);

  useEffect(() => {
    filterByPrice(priceRange.from, priceRange.to);
    changeFiltering();
  }, [priceRange]);

  useEffect(() => {
    filterByLowerOrHigherPrice(lowerOrHigherPrice);
    changeFiltering();
  }, [lowerOrHigherPrice]);

  useEffect(() => {
    filterByRecentOrOldestDate(recentOrOldest);
    changeFiltering();
  }, [recentOrOldest]);

  useEffect(() => {
    filterByOffered(filterOffered);
    changeFiltering();
  }, [filterOffered]);

  return (
    <Grid
      bg="facebook.500"
      py={2}
      px={6}
      w={{ md: "xs" }}
      gap="2rem"
      m={0}
      alignContent="start"
      color="white"
      as="aside"
    >
      <Box position='sticky' top={20}>
        <Grid gap="2px">
          <Heading fontSize="lg" mt={2}>
            Filter by price
          </Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2rem"
              children="$"
            />
            <Input
              placeholder="Price range from"
              type="number"
              onChange={(e) =>
                setPriceRange((prev) => {
                  return { ...prev, from: parseInt(e.target.value) };
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2rem"
              children="$"
            />
            <Input
              placeholder="Price range up to"
              type="number"
              onChange={(e) =>
                setPriceRange((prev) => {
                  return { ...prev, to: parseInt(e.target.value) };
                })
              }
            />
          </InputGroup>
          <Checkbox onChange={(e) => setFilterOffered(e.target.checked)} m={4}>
            Filter by offered
          </Checkbox>
        </Grid>
        <Grid gap={2}>
          <Heading fontSize="lg">Order by</Heading>
          <Select
            placeholder="Price"
            variant="filled"
            size="md"
            onChange={(e) => setLowerOrHigherPrice(e.target.value)}
          >
            <option value="lowerPrice">Lower price</option>
            <option value="higherPrice">Higher price</option>
          </Select>
          <Select
            placeholder="Date"
            variant="filled"
            size="md"
            onChange={(e) => setRecentOrOldest(e.target.value)}
          >
            <option value="moreRecent">More recent</option>
            <option value="oldest">Oldest</option>
          </Select>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FilterAside;
