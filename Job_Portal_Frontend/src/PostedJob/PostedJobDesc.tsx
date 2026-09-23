import { Badge, Tabs } from "@mantine/core";
import Job from "../JobDesc/Job";
import { talents } from "../Data/TalentData";
import TalentCard from "../FindTalent/TalentCard";
import { useEffect, useState } from "react";

const PostedJobDesc=(props:any)=> {

  const [tab,setTab]=useState("overview");
  const [arr,setArr]=useState<any>([]);

  const handleTabChange=(value:any)=>{
    setTab(value);
    if(value=="applicants"){
   setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="APPLIED"));
  }
  else if(value=="invited"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="INTERVIEWING"));
  }
   else if(value=="offered"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="OFFERED"));
  }
   else if(value=="rejected"){
    setArr(props.applicants?.filter((x:any)=>x.applicationStatus=="REJECTED"));
  }
}
  useEffect(()=>{
   handleTabChange("OVERVIEW");
   },[props]  )

return <div className=" md-mx:w-full w-3/4  px-5 md-mx:p-0 ">
  {props.jobTitle?<><div className="text-2xl xs-mx:text-xl font-semibold flex items-center">
    {props.jobTitle} <Badge variant="light" ml="sm" color="brightSun.4" size="sm" > 
      {props.jobStatus} </Badge></div>      
<div className="font-medium text-mine-shaft-300 mb-5 xs-mx:text-sm"> {props.location} </div>
<div>
     <Tabs  value={tab} onChange={handleTabChange} variant="outline" radius="lg" >
               <Tabs.List className="[&_button[data-active='true']]:!border-b-mine-shaft-950  [&_button]:!text-xl sm-mx:[&_button]:!text-lg mb-5  [&_button[data-active='true']]:text-amber-400 xs-mx:[&_button]:!text-base xs-mx:[&_button]:!px-1.5 xs-mx:font-medium xs-mx:[&_button]:!py-2 xsm-mx:[&_button]:!text-sm " >
               <Tabs.Tab value="overview">Overview</Tabs.Tab>
               <Tabs.Tab value="applicants">Applicants</Tabs.Tab>
               <Tabs.Tab value="invited">Invited</Tabs.Tab>
               <Tabs.Tab value="offered">Offered</Tabs.Tab>
               <Tabs.Tab value="rejected">Rejected</Tabs.Tab>
               </Tabs.List> 
               <Tabs.Panel value="overview" className="[&>div]:w-full"><Job {...props} 
              edit={true}  closed ={props.jobStatus=="CLOSED"} /> </Tabs.Panel>
               <Tabs.Panel value="applicants"><div className="flex mt-10 flex-wrap gap-5 justify-around">
                 {
                 arr?.length?arr.map((talent:any , index:any)=> <TalentCard key={index} 
                  {...talent} posted={true} /> ): <div className="text-2xl font-semibold">NO 
                  applicants </div>
                 }
                 </div></Tabs.Panel>
               <Tabs.Panel value="invited"><div className="flex mt-10 flex-wrap gap-5 
               justify-around">
                 {
                arr?.length?arr.map((talent:any,index:any)=> <TalentCard  key={index}
                 {...talent} invited={true} /> ):<div className="text-2xl font-semibold">No invited
                 candidates </div>
                 }
                 </div></Tabs.Panel>
                <Tabs.Panel value="offered"><div className="flex mt-10 flex-wrap gap-5 
               justify-around">
                 {
                arr?.length?arr.map((talent:any , index:any)=> <TalentCard key={index} {...talent} 
                offered  />):<div className="text-2xl font-semibold ">No offered 
                candidates </div>
                 }
                 </div>
               </Tabs.Panel>
                <Tabs.Panel value="rejected"><div className="flex mt-10 flex-wrap gap-5 
               justify-around">
                 {
               arr?.length?arr.map((talent:any ,index:any)=><TalentCard key={index} 
               {...talent} offered  /> ):<div className="text-2xl font-semibold ">No rejected
               candidates </div>
                 }
                 </div>
               </Tabs.Panel>
       </Tabs>
</div>
 </>:<div className="text-2xl font-semibold flex min-h-[70vh] justify-center items-center"> No job selected</div> }
</div>
}
export default PostedJobDesc;