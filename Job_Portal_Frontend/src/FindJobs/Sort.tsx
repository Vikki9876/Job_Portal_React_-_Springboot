import { useState } from 'react';
import {  Combobox, useCombobox } from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import { updateSort } from '../Slices/SortSlice';
import { useDispatch } from 'react-redux';

const opt = ['Relevance', 'Most Recent', 'Salary: Low to High', 'Salary: High to Low' ] ;
const talentSort=['Relevance', 'Experience: Low to High', 'Experience:  High to Low']

const Sort=(props:any)=> {
const dispatch=useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevnace');
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options =props.sort=="job"?opt.map((item) => (
    <Combobox.Option  className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  )):talentSort.map((item)=>(
    <Combobox.Option className='!text-xs' value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
   
      <Combobox
        store={combobox}
        width={150}
        position="bottom-start"
        onOptionSubmit={(val) => {
          setSelectedItem(val);
          dispatch(updateSort(val));
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <div  onClick={()=>combobox.toggleDropdown() } className=' cursor-pointer border border-b-orange-400 flex gap-2 px-2 py-1 text-sm  rounded-xl items-center xs-mx:text-xs xs-mx:py-0 pr-1 my-2 xsm-mx:mt-2 '>
            {selectedItem }<IconAdjustments className=' h-5 w-5  text-amber-400'/>
          </div>
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
  );
}
export default Sort ;