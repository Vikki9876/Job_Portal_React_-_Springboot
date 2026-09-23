import { ActionIcon } from "@mantine/core";
import { IconPlus, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { useState } from "react";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import { useSelector } from "react-redux";
import { useMediaQuery } from "@mantine/hooks";

const Experience=()=>{
    const matches=useMediaQuery('(min-width:475px)');
    const [edit,setEdit]=useState(false);
    const [addExp,setAddExp]=useState(false);
    const profile=useSelector((state:any)=>state.profile);
    
    const handleClick=()=>{
        setEdit(!edit);
    }
    
    return <div >
         <div className="text-2xl font-semibold mb-4 flex justify-between">
            Experiance
            <div className="flex gap-2">
                <ActionIcon onClick={()=>setAddExp(true) } size={matches?"md":"lg"}
                 color="brightSun.4" variant="subtle">
                    <IconPlus className="h-4/5 w-4/5"/> 
                </ActionIcon> 
                <ActionIcon onClick={handleClick}  color={edit?"red.8":"brightSun.4" } size={matches?"md":"lg"} variant="subtle">
                    {edit ?<IconX className="h-4/5 w-4/5"/>:<IconPencil className="h-4/5 w-4/5"/> } 
                </ActionIcon>
            </div>
        </div>
        <div className="flex flex-col gap-8">
        {
          profile?.experience?.map((exp:any , index:number) => <ExpCard edit={edit} key={index} index={index} {...exp} /> )
        }
        {addExp &&<ExpInput add setEdit={setAddExp} />}
        </div>
    </div>
}
export default Experience ;