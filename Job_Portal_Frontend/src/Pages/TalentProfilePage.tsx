import { Button, Divider } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";

const TalentProfilePage=()=>{
    const navigate =useNavigate();
   const [talents , setTalents] =useState<any[]>([]);
   useEffect(()=>{
    getAllProfiles().then((res)=>{
      setTalents(res);
    } ).catch((err)=>{
      console.log(err);
    })
   }, [] ) ;
   
    return ( 
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['-poppins'] p-4" >  
      <Divider size="xs" mx="md"/>
      <Button onClick={()=>navigate(-1) } leftSection={<IconArrowLeft size={20}/> } color="brightSun.4" variant="light"  >Back</Button>
      <div className="flex gap-5 lg-mx:flex-wrap">
      <Profile />
      <RecommendTalent talents={talents}/>
      </div> 
</div> )
}
export default TalentProfilePage ;