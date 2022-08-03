import { Search2Icon } from '@chakra-ui/icons'
import { Box, Container, Flex, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <Box bg={'white'} shadow={'sm'} mb={3} color={'blackAlpha.900'} p={4} w='100%'>
        <Flex justifyContent={'space-between'} >
            <Flex gap={4}>
                <Box to='/' as={NavLink} fontSize={20}>Home</Box>
                <Box to='/store' as={NavLink} fontSize={20}>Store</Box>
            </Flex>
            <InputGroup w={'lg'}>
                <InputLeftElement children={<Search2Icon />} pointerEvents="none"/>
                <Input type="text" name='search' placeholder='Search product' borderColor='gray.400' color='black' _hover={{borderColor: "gray.600"}}/>
            </InputGroup>
        </Flex>
    </Box>
  )
}

export default Navbar