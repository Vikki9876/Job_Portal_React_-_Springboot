import { ActionIcon, Button, Divider } from "@mantine/core";
import IconBookmark from "@tabler/icons-react/dist/esm/icons/IconBookmark"
import { Link } from "react-router-dom";
import { card } from "../Data/JobDescData";
import DOMPurify from 'dompurify' ;
import { timeAgo } from "../Services/Utilities";
import { IconBookmarkFilled } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { useEffect, useState } from "react";
import { postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";

const Job=(props:any)=>{

    const profile=useSelector((state:any)=>state.profile);
    const dispatch=useDispatch();
    const user=useSelector((state:any)=>state.user);
    const [applied ,setApplied]=useState(false);
    const handleSaveJob=()=>{ 
           let savedJobs: any[] = profile.savedJobs ? [...profile.savedJobs] : [];
           if(savedJobs?.includes(props.id)){
           savedJobs=savedJobs?.filter((id:any)=>id!==props.id);
           } else{
               savedJobs=[...savedJobs, props.id] ;
           }
           let updatedProfile={...profile ,savedJobs:savedJobs};
           dispatch(changeProfile(updatedProfile));
       }

      useEffect(() =>{
        if(props.applicants?.filter((applicant:any)=>applicant.applicantId==user.id).length>0 )
        {
            setApplied(true);
        }
        else setApplied(false);
      }, [props] )
      
      const handleClose=()=>{
        postJob({...props ,jobStatus:"CLOSED"}).then((res)=>{
            successNotification("success","Job cloed succesfully" );
        }).catch((err)=>{
            errorNotification("error",err.response.data.errorMessage );
        } )
      }
    const data= DOMPurify.sanitize(props.description ) ;
    return <div className="w-2/3 bs-mx:w-full">
      <div className="flex justify-between  flex-wrap ">
          <div className="flex gap-2 items-center">
              <div className="p-3 bg-mine-shaft-800 rounded-xl ">
                  <img className="h-14 xs-mx:h-10 xs-mx:w-10 " src={`/Icons/${props.company}.png`} alt="" />
              </div>
              <div className="flex flex-col gap-1">
          <div className="font-semibold text-2xl xs-mx:text-xl ">{props.jobTitle} </div>
          <div className="text-lg text-mine-shaft-300 flex   xs-mx:text-base"> <span> {props.company}
                &bull;</span> <span> {timeAgo(props.postTime)} </span>  &bull; <span>  {props.applicants?props.applicants.length:0 }  Applicants </span></div>
              </div>
          </div>
          <div className="flex sm:flex-col gap-2 items-center sm-mx:my-5 sm-mx:[&>button]:w-1/2 sm-mx:w-full" >
        {(props.edit || !applied) &&<Link to={ props.edit?`/post-job/${props.id}`:`/apply-job/${props.id}`} >
          <Button  color="brightSun.4" size="sm" variant="light">
            {props.closed?"Reopen": props.edit?"Edit":"Apply"} </Button>
          </Link>}
          {
           !props.edit || applied&& <Button color="green.8" size="sm" variant="light"> Applied </Button>
          }
       { props.edit && !props.closed?  <Button  color="red.5" onClick={handleClose}  size="sm" 
       variant="outline">Close</Button> :  profile.savedJobs?.includes(props.id)?<IconBookmarkFilled   
            onClick={handleSaveJob} className="cursor-pointer text-amber-400 "
             stroke={1.5} />:<IconBookmark onClick={handleSaveJob}  className="cursor-pointer   hover:text-amber-400 
             text-mine-shaft-300 " stroke={1.5} />} 
          </div>     
    </div>
        <Divider size="xs" my="xl" />
            <div className="flex justify-between sm-mx:flex-wrap ">
                {
       card.map(( item , index)=> <div key={index} className="flex flex-col items-center gap-1">
    <ActionIcon color="brightSun.4" className="!h-12 !w-12 xs-mx:!h-8 xs-mx:!w-8 " size="lg" radius="xl"  variant="light" aria-label="Settings">
    <item.icon  className="h-4/5 w-4/5" stroke={1.5} />
    </ActionIcon>
    <div className="text-mine-shaft-300 xs-mx:text-sm" >{item.name}</div>
    <div className="text-base font-semibold xs:mx-text-sm">{props?props[item.id]:"NA"} {item.id=="packageOffered" && <>LPA</>}  </div> 
            </div> )
       }
        </div>
        <Divider my="xl"/>
        <div>
        <div className="text-xl font-semibold mb-5 ">Required skills </div>
        <div className="flex flex-wrap gap-2">
            {
               (props.skillsRequired || []).map((skill:any ,index:number ) => 
                   <ActionIcon  key={index}  color="brightSun.4" className="!h-fit font-medium !text-sm !w-fit xs-mx:!text-xs  " radius="xl"  p="xs" variant="light" aria-label="Settings" >
                       {skill}
                   </ActionIcon> 
               )
            }
        </div>
        </div>
        <Divider my="xl"/>
 <div className="[&_h4]:text-xl  [&_*]:text-mine-shaft-300 
  [&_li]:marker:text-amber-400 [&_h4]:my-5 [&_h4]:font-semibold
 [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_p]:text-sm [&_li]:text-sm " dangerouslySetInnerHTML={{__html:data}}>
 </div>
 <Divider my="xl"/>
 <div> 
     <div className="text-xl font-semibold mb-5">About</div>      
<div className="flex justify-between items-center mb-3 xs:mx:flex-wrap xs-mx:gap-2">
    <div className="flex gap-2 items-center mb-3">
   <div className="p-3 bg-mine-shaft-800 rounded-xl ">
        <img className="h-8 " src={`/Icons/${props.comapny}.png`} alt="" />
                 </div>
        <div className="flex flex-col ">
        <div className="font-semibold text-2xl">{props.company}</div>
        <div className="text-lg text-mine-shaft-300 ">10K
            Employees</div>
                 </div>
            </div>
           <Link to={`/company/${props.company}`} >
            <Button  color="brightSun.4"  variant="light">company page</Button>
            </Link>
            </div>
            <div className="text-mine-shaft-300 text-justify xs-mx:text-sm"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem delectus maiores nobis quis in veniam ipsam quod dolore neque, corrupti magnam eveniet, recusandae esse autem repudiandae excepturi nemo libero ullam?
            Dolorem nesciunt neque numquam assumenda quisquam ex incidunt! Facere, voluptatibus illo. Temporibus, consequatur tempore inventore </div>      
    </div>
      </div>
}
export default Job ;