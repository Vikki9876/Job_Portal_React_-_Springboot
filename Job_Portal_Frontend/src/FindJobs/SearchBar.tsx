import { Button, Collapse, Divider, RangeSlider } from "@mantine/core";
import { dropdowndata } from "../Data/JobsData";
import MultiInput from "./Multiinput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateFilter } from "../Slices/FilterSlice";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar = () => {
  const matches=useMediaQuery('(max-width:475px)') ;
  const [opened, { toggle }] = useDisclosure(true); 
  const dispatch = useDispatch();
  const [value, setValue] = useState<[number, number]>([0, 300]);

  const handleChange = (event: [number, number]) => {
    dispatch(updateFilter({ salary: event }));
  };

  return (
   <div >
    <div className="flex justify-end ">
    
    {matches&&<Button onClick={toggle} my="xs" radius="lg" variant="outline"color="brightSun.4"  autoContrast > 
      {opened?"Close":"Filters"} </Button>} 
     </div>
     <Collapse in={!(opened || !matches) }>
      <div className="px-5 lg-mx:flex-wrap py-8 items-center text-mine-shaft-100 flex gap-4">
        {dropdowndata.map((item, index) => (
          <div key={index} className="flex items-center w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 ">
            <div className="flex-1">
              <MultiInput {...item} />
            </div>
            {index < dropdowndata.length - 1 && (
              <Divider className="sm-mx:hidden" ml="md" mr="xs" size="xs" orientation="vertical" />
            )}
          </div>
        ))}

        <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] text-sm text-mine-shaft-300 [&_.mantine-slider-label]:!translate-y-10">
          <div className="flex justify-between mb-2">
            <div>Salary</div>
            <div>&#8377;{value[0]}LPA - &#8377;{value[1]}LPA</div>
          </div>
          <RangeSlider
            color="brightSun.4"
            size="xs"
            value={value}
            labelTransitionProps={{
              transition: 'skew-down',
              duration: 150,
              timingFunction: 'linear',
            }}
            onChange={setValue}
            onChangeEnd={handleChange}
          />
        </div>
      </div>
    </Collapse>
    </div>
  );
};

export default SearchBar;