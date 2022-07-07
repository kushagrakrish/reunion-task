import React, { useState, useEffect } from "react";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";

import Property from "../components/Property";
import { baseUrl, fetchApi } from "../utils/FetchApi";
import noresult from "../images/noresult.svg";
import SearchFilters from "./SearchFilters";
const Search = () => {
  const [searchFilters, setSearchFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const searchPurpose = searchParams.get("purpose");
  const [propertys, setPropertys] = useState([]);

  useEffect(() => {
    const properties = async () => {
      const purpose = searchPurpose.purpose || "for-rent";
      const rentFrequency = searchPurpose.rentFrequency || "yearly";
      const minPrice = searchPurpose.minPrice || "0";
      const maxPrice = searchPurpose.maxPrice || "1000000";
      const roomsMin = searchPurpose.roomsMin || "0";
      const bathsMin = searchPurpose.bathsMin || "0";
      const sort = searchPurpose.sort || "price-desc";
      const areaMax = searchPurpose.areaMax || "35000";
      const locationExternalIDs = searchPurpose.locationExternalIDs || "5002";
      const categoryExternalID = searchPurpose.categoryExternalID || "4";
      try {
        const response = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
        );
        const data = await response;
        // console.log(data.hits);
        setPropertys(data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    properties();
  }, []);

  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft='2' w='7' as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize='2xl' p='4' fontWeight='bold'>
        Properties {searchPurpose}
      </Text>
      <Flex flexWrap='wrap'>
        {propertys?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {propertys.length === 0 && (
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDir='column'
          marginTop='5'
          marginBottom='5'
        >
          <img src={noresult} alt='noresults' />
          <Text fontSize='xl' marginTop='3'>
            No Result Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;
