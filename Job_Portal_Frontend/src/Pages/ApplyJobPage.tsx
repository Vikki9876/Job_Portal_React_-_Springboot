import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ApplyJobComp from "../ApplyJob/ApplyJobComp";
import { useEffect, useState } from "react";
import { getJob } from "../Services/JobService";


const ApplyJobPage=()=>{
  const navigate=useNavigate();
  const {id}=useParams();
  const [job,setJob ]=useState<any>(null);
  useEffect(()=>{
    window.scrollTo(0,0);
    getJob(id).then((res)=>{
      setJob(res);
    }).catch((err)=>{
      console.log(err);
    })
  },[id] )
  return ( 
    <div className="min-h-[100vh] bg-mine-shaft-950 font-['-poppins'] p-4" >  
       <Link className="my-5 inline-block" to="/jobs">
           <Button color="brightSun.4" mb="xs"  onClick={()=>navigate(-1) }   leftSection={<IconArrowLeft size={20}/> }  variant="light">Back</Button>
            </Link>
            <ApplyJobComp {...job}/>
   </div>
  )
}
export default ApplyJobPage ;