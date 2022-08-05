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
import { FormattedMessage } from "react-intl";
import { useItemsContext } from "../context/ItemsContext";
import { useLangContext } from "../context/LangContext";

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
  const {actualLang} = useLangContext()

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
      py={{ base: 10, md: 2 }}
      px={6}
      w={{ md: "xs" }}
      gap="2rem"
      m={0}
      alignContent="start"
      color="white"
      as="aside"
    >
      <Box position="sticky" top={28}>
        <Grid gap="2px">
          <Heading fontSize="lg" mt={2}>
            <FormattedMessage
              id="filterAsideByPrice"
              defaultMessage="Filter by price"
            />
          </Heading>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1.2rem"
              children="$"
            />
            <Input
              placeholder={actualLang === 'en-US' ? "Price range from" : "Faixa de preço de"}
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
              placeholder={actualLang === 'en-US' ? "Price range up to" : "Faixa de preço até"}
              type="number"
              onChange={(e) =>
                setPriceRange((prev) => {
                  return { ...prev, to: parseInt(e.target.value) };
                })
              }
            />
          </InputGroup>
          <Checkbox onChange={(e) => setFilterOffered(e.target.checked)} m={4}>
            <FormattedMessage
              id="fiterAsideByOffered"
              defaultMessage="Filter by offered"
            />
          </Checkbox>
        </Grid>
        <Grid gap={2}>
          <Heading fontSize="lg">
            <FormattedMessage
              id="filterAsideOrderBy"
              defaultMessage="Order by"
            />
          </Heading>
          <Select
            placeholder={actualLang === 'en-US' ? "Price" : "Preço"}
            variant="filled"
            size="md"
            onChange={(e) => setLowerOrHigherPrice(e.target.value)}
          >
            <option value="lowerPrice">
              <FormattedMessage
                id="filterAsideOptionLowerPrice"
                defaultMessage="Lower price"
              />
            </option>
            <option value="higherPrice">
              <FormattedMessage
                id="filterAsideOptionHigherPrice"
                defaultMessage="Higher price"
              />
            </option>
          </Select>
          <Select
            placeholder={actualLang === 'en-US' ? "Date": "Encontro"}
            variant="filled"
            size="md"
            onChange={(e) => setRecentOrOldest(e.target.value)}
          >
            <option value="moreRecent">
              <FormattedMessage
                id="filterAsideOptionMoreRecent"
                defaultMessage="More recent"
              />
            </option>
            <option value="oldest">
              <FormattedMessage
                id="filterAsideOptionOldest"
                defaultMessage="Oldest"
              />
            </option>
          </Select>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FilterAside;
