import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { baseUrl, fetchApi } from "./utils/FetchApi";
import Property from "./components/Property";
import Footer from "./components/Footer";
import Search from "./components/Search";

const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  imageUrl,
}) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <img src={imageUrl} width={500} height={300} alt='Banner' />
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>
        {purpose}
      </Text>
      <Text fontSize='3xl' fontWeight='bold'>
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize='xl' colorScheme='teal' variant='outline'>
        <Link to={"linkName"}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

const App = () => {
  const [sales, setSales] = useState([]);
  const [rents, setRents] = useState([]);
  useEffect(() => {
    const propertiesForSale = async () => {
      try {
        const response = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
        );
        const data = await response;
        // console.log(data.hits);
        setSales(data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    propertiesForSale();
  }, []);
  useEffect(() => {
    const propertiesForRent = async () => {
      try {
        const response = await fetchApi(
          `${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
        );
        const data = await response;
        // console.log(data.hits);
        setRents(data.hits);
      } catch (error) {
        console.log(error);
      }
    };
    propertiesForRent();
  }, []);
  return (
    <>
      <Box maxWidth='1280px' m='auto'>
        <Navbar />
      </Box>
      <Routes>
        <Route path='/search' element={<Search />} />
      </Routes>
      <Box>
        <Banner
          purpose='RENT A HOME'
          title1='Rental Homes for'
          title2='Everyone'
          desc1=' Explore from Apartments, builder floors, villas'
          desc2='and more'
          buttonText='Explore Renting'
          linkName='/search?purpose=for-rent'
          imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />
        <Flex flexWrap='wrap'>
          {rents?.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
        <Banner
          purpose='BUY A HOME'
          title1=' Find, Buy & Own Your'
          title2='Dream Home'
          desc1=' Explore from Apartments, land, builder floors,'
          desc2=' villas and more'
          buttonText='Explore Buying'
          linkName='/search?purpose=for-sale'
          imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        />
        <Flex flexWrap='wrap'>
          {sales?.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
        <Box maxWidth='1280px' m='auto'>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default App;
