import { Button, Collapse, Divider, Input, RangeSlider } from "@mantine/core";
import { useState } from "react";
import { searchFields } from "../Data/TalentData";
import MultiInput from "../FindJobs/Multiinput";
import { IconUserCircle } from "@tabler/icons-react";
import React from "react";
import { updateFilter } from "../Slices/FilterSlice";
import { useDispatch } from "react-redux";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const SearchBar=()=>{
   const matches=useMediaQuery('(max-width :475px)');
   const [opened,{toggle}]=useDisclosure(false); 
   const[value,setValue]=useState<[number,number]>([0 ,50]) ; 
    const [name,setName ]=useState('');
    const dispatch=useDispatch();
    const handleChange=(name:any,event:any)=>{
    if(name=="exp")
      dispatch(updateFilter({exp:event}));
   else
   {
      setName(event.target.value);
      dispatch(updateFilter({name:event.target.value}));
       }
    } 

    return <div >
        <div className="flex justify-end ">
        
        {matches&&<Button onClick={toggle} my="xs" radius="lg" variant="outline"color="brightSun.4"  autoContrast > 
          {opened?"Close":"Filters"} </Button>} 
         </div>
         <Collapse in={!(opened || !matches) }>
       
    <div className="items-center , !text-mine-shaft-100 flex px-5 py-8 ">
        <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] flex items-center xs-mx:w-full xs-mx:mb-1 ">
            <div className="text-orange-400  rounded-full  bg-mine-shaft-900 p-1 mr-2"><IconUserCircle size={20}/></div>
            <Input defaultValue={name} onChange={(e)=>handleChange("name",e) } className="[&_input]:!placeholder-mine-shaft-300" variant="unstyled" placeholder="talent names"/>
        </div>
     {
        searchFields.map((item,index)=>{
         return <React.Fragment key={index}> <div className="w-1/5 lg-mx:w-1/4 bs-mx:w-[30%] sm-mx:w-[48%] xs-mx:w-full xs-mx:mb-1 " > 
       <MultiInput title={item.title} icon={item.icon} options={item.options}  />
        </div> 
        <Divider className="sm-mx:hidden" mr="xs" size="xs" orientation="vertical"/>
        </React.Fragment> 
     })
   }
     <div className="w-1/5 lg-mx:w-1/4 lg-mx:mt-7 bs-mx:w-[30%] sm-mx:w-[48%] text-sm text-mine-shaft-300  [&_.mantine-slider-label]:!translate-y-10 xs-mx:w-full xs-mx:mb-1">
     <div className="flex mb-1 justify-between">
        <div>Experiance(year)</div>
        <div>{value[0]}LPA -{value[1]} LPA</div>
     </div>
     <RangeSlider onChangeEnd={(e)=>handleChange("exp",e)} 
     color="brightSun.4" size="xs" min={1} max={50} minRange={1} value={value}   
     onChange={setValue} />; 
  </div>
  </div>
  </Collapse>
  </div>
}
export default SearchBar ;