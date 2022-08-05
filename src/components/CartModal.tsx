import { DeleteIcon } from "@chakra-ui/icons";
import {
  Image,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Box,
} from "@chakra-ui/react";
import { FormattedMessage } from "react-intl";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { cardItemWhitQuantity, modalProps } from "../interfaces/interfaces";
import { getCartItems } from "../utils/utils";

const CartModal = ({ isOpen, onClose }: modalProps) => {
  const {
    cartItems,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const items: cardItemWhitQuantity[] = getCartItems(cartItems);

  const totalPrice = items.reduce(
    (price, item) => item.price * item.quantity + price,
    0
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="white"> <FormattedMessage id="modalTitle" defaultMessage='My cart' /> </ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <Grid gap={2}>
            {items.map((item) => (
              <Grid
                border="1px"
                borderColor="gray.200"
                rounded="lg"
                color="gray.300"
                p={2}
                gap={2}
              >
                <Box display="block" justifySelf="end">
                  <DeleteIcon
                    cursor="pointer"
                    fontSize={20}
                    onClick={() => removeFromCart(item.id)}
                  />
                </Box>
                <Flex justifyContent="space-between">
                  <Grid>
                    <h3>
                      {item.name}{" "}
                      <Button
                        size="xs"
                        onClick={() => decreaseCartQuantity(item.id)}
                      >
                        -
                      </Button>{" "}
                      x {item.quantity}{" "}
                      <Button
                        size="xs"
                        onClick={() => increaseCartQuantity(item.id)}
                      >
                        +
                      </Button>
                    </h3>
                    <Text fontSize="xl" fontWeight={700}>
                      ${item.price}
                    </Text>
                  </Grid>
                  <Image
                    src={item.imageUrl}
                    alt={`Descriptive image of the shoes ${item.name}`}
                    height={50}
                    w={50}
                    fallbackSrc="https://www.azendportafolio.com/static/img/not-found.png"
                  />
                </Flex>
              </Grid>
            ))}
            <Text textAlign="end" fontWeight={900} color="gray.100">
              Total: ${totalPrice}
            </Text>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            <FormattedMessage id="modalCancelButton" defaultMessage='Cancel' />
          </Button>
          <Button colorScheme="blue">
            <FormattedMessage id="modalPayButton" defaultMessage='Pay' />
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
