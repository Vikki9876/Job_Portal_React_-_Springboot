import { ActionIcon } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { formDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";

const CertiCard=(props:any)=>{
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);
     const matches=useMediaQuery('(max-width:475px)') ;
        
      const handleDelete = () => {
        let certis = [...profile.certifications ];
        certis.splice(props.index, 1) ;
        let updatedProfile = {...profile, certifications : certis };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "certificate  deleted Succesfully");
    }

    return     <div className="flex justify-between">
            <div className="flex gap-2 items-center flex-wrap ">
                <div className="p-2 bg-mine-shaft-800 rounded-md shrink-0">
                    <img className="h-7 " src={`/Icons/${props.issuer}.png`} alt="" />
                </div>
                <div className="flex flex-col">
          <div className="font-semibold xs-mx:text-sm ">{props.name}</div>
            <div className="text-sm text-mine-shaft-300 xs-mx:text-xs ">{props.issuer}</div>
                </div>
            </div>
            <div className="flex gap-2">
            <div className="flex flex-col items-end sm-mx:flex-row sm-mx:gap-2">
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs ">Issued { formDate(props.issueDate ) } </div>
          <div className="text-sm text-mine-shaft-300 xs-mx:text-xs ">ID : {props.certificatedId }</div>
          </div>
          {props.edit&&<ActionIcon onClick={ handleDelete } size={matches?"md":"lg"} color="brightSun.4" variant="subtle"> 
             <IconTrash className="h-4/5 w-4/5"/>   
                  </ActionIcon>}
           </div>
        </div> 
}
export default CertiCard ;