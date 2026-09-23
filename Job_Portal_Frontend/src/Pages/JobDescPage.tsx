import { Button, Divider } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import Profile from "../TalentProfile/Profile";
import { profile } from "../Data/TalentData";
import RecommendTalent from "../TalentProfile/RecommendTalent";
import RecommendedJobs from "../JobDesc/RecommendedJobs";
import Job from "../JobDesc/Job";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";

const JobDescPage=()=>{
  const {id}=useParams();
  const [job,setJob]=useState<any>(null);
  useEffect(()=>{
    getJob(id).then((res)=>{
      setJob(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[id ] )
    return ( 
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['-poppins'] p-4" >  
      <Link className="my-5 inline-block" to="/find-jobs">
     <Button color="brightSun.4" leftSection={<IconArrowLeft size={20}/> } variant="light">Back</Button>
      </Link>
      <Divider className="xs"/>
    <div className="flex gap-5 justify-around bs-mx:flex-wrap">
   
   <Job {...job}/>
   <RecommendedJobs/>
      </div> 
</div> )
}
export default JobDescPage ;