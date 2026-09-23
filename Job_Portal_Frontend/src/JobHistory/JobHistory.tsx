import { Tabs } from "@mantine/core";
import Card from "./Card";
import { useEffect, useState } from "react";
import { getAllJobs } from "../Services/JobService";
import { useSelector } from "react-redux";


const JobHistory=()=>{

   const [activeTab,setActiveTab] =useState<any>('APPLIED');
   const [jobList,setJobList]=useState<any>([]);
   const [showList ,setShowList] =useState<any>([]) ;
   const profile=useSelector((state:any)=>state.profile);
   const user=useSelector((state:any)=>state.user);
 
   useEffect(()=>{
      getAllJobs().then((res)=>{
         setJobList(res);
    setShowList(res.filter((job:any)=> {
    let found=false;
    job.applicants?.forEach((applicant:any)=>{
      if(applicant.applicantId==user.id && 
         applicant.applicationStatus=="APPLIED") {
            found=true ;
         }
   })
   return found ;
} ));
    }).catch((err)=>{
         console.log(err);})
   } , [])


    const handleTabChange=(value:string|null)=>{
      setActiveTab(value);
      if(value=="SAVED"){
     setShowList(jobList.filter((job:any)=>profile.savedJobs?.includes(job.id))) ;
      }
      else    {
  setShowList(jobList.filter((job:any)=> {
   let found=false;
   job.applicants?.forEach((applicant:any)=>{
      if(applicant.applicantId==user.id && 
         applicant.applicationStatus==value) {
            found=true ;
         }
   })
   return found ;
     } ));
      } 
   }
 
    return <div className="">
        <div className="text-2xl font-semibold mb-5"> Job History </div> 
                 <div>
                    <Tabs value={activeTab}  onChange={handleTabChange}  variant="outline" radius="lg" 
                    autoContrast>
                       <Tabs.List className="[&_button[data-active='true']]:!border-b-mine-shaft-950  [&_button]:!text-xl sm-mx:[&_button]:!text-lg mb-5  [&_button[data-active='true']]:text-amber-400 xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2 xsm-mx:[&_button]:!text-sm " >
                       <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                       <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                       <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                       <Tabs.Tab value="INTERVIEWING">In Progress </Tabs.Tab>
                       </Tabs.List> 
                        <Tabs.Panel value={activeTab} className="[&>div]:w-full">
                       <div className="mt-10 flex flex-wrap gap-5 ">
                       {
                       showList.map((item:any,index:any) => <Card key={index} 
                       {...item}  {...{[activeTab.toLowerCase()]:true }}  /> )
                       }
                      </div>
                    </Tabs.Panel>
                  </Tabs>    
                 </div>
            </div>
}
export default JobHistory ;