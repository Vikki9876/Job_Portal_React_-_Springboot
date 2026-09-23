import { ActionIcon, Textarea } from "@mantine/core";
import { IconCheck, IconDeviceFloppy, IconPencil, IconX } from "@tabler/icons-react";
import { profile } from "console";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const About=()=>{
     const dispatch=useDispatch();
     const matches=useMediaQuery('(min-width:475px)') ;
     const [edit, setEdit] = useState(false);
     const profile=useSelector((state:any)=>state.profile ) ;  
     const [about,setAbout]=useState("");
     const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);  
        } else 
            setEdit(false);
        }

     const handleSave=()=>{
     setEdit(false);
     let updatedProfile={...profile , about: about };
     dispatch(changeProfile(updatedProfile)) ;
     successNotification("Success","About updated Suceesfully ") ;
     }


    return <div>
     <div className="text-2xl font-semibold mb-3 flex justify-between ">About <div>
     {edit && <ActionIcon onClick={ handleSave} size={matches?"md":"lg"}   color="brightSun.4" variant="subtle">
     <IconCheck className="h-4/5 w-4/5" stroke={1.5} /> </ActionIcon> }
      <ActionIcon onClick={handleClick} variant="subtle" color= 
      {edit?"red.8":"brightSun.4"} size={matches?"md":"lg"} > {edit ? <IconX className="w-4/5 h-4/5" stroke=
        {1.5} /> :<IconPencil className="w-4/5 h-4/5" stroke={1.5} /> }  </ActionIcon>
     </div></div>
      { edit ? <Textarea value={about}  onChange={(e) => setAbout(e.target.value)}  
      placeholder="Enter about yourself .. " autosize minRows={3} /> : <div className="text-sm text-mine-shaft-300
          text-justify">{profile?.about} </div>
        }
        </div>
      }
export  default About ;