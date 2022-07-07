import { useState } from "react";
import { Flex, Select, Box } from "@chakra-ui/react";

import { filterData } from "..//utils/FilterData";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };
  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const searchProperties = (filterValues) => {};
  return (
    <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
      {filters?.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w='fit-content'
            p='2'
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}
      <Box>
        <DateRangePicker
          ranges={[selectionRange]}
          minDate={new Date()}
          rangeColors={["#5b73fd"]}
          onChange={handleSelect}
        />
      </Box>
    </Flex>
  );
};

export default SearchFilters;
