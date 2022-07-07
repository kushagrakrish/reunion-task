import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu, FcHome, FcAbout } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
const Navbar = () => {
  return (
    <>
      <Flex p='2' borderBottom='1px' borderColor='gray.100'>
        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
          <Link to='/' className='pl-2'>
            Real Estatery
          </Link>
        </Box>
        <Spacer />

        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FcMenu />}
              variant='outline'
              color='red.400'
            />
            <MenuList>
              <Link to='/'>
                <MenuItem icon={<FcHome />}>Home</MenuItem>
              </Link>

              <Link to='/search'>
                <MenuItem icon={<BsSearch />}>Search</MenuItem>
              </Link>
              <Link to='/search?purpose=for-sale'>
                <MenuItem icon={<FcAbout />}>Buy Property</MenuItem>
              </Link>
              <Link to='/search?purpose=for-rent'>
                <MenuItem icon={<FiKey />}>Rent Property</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
