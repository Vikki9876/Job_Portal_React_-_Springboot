import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import IconAnchor from "@tabler/icons-react/dist/esm/icons/IconAnchor";
import { footerlinks } from "../Data/Data";
import { useLocation } from "react-router-dom";

const Footer=()=>{
    const location = useLocation();
    return  location.pathname!="/signup" && location.pathname!="/login"?<div className="mt-20 pb-5 p-4 flex gap-8 justify-around  bg-mine-shaft-950 font-['-poppins'] flex-wrap ">
        <div className="w-1/4 sm-mx:w-1/3  xs-mx:w-1/2  xsm-mx:w-full flex flex-col gap-4">
<div className="flex gap-1 items-center text-amber-400 " >
    <IconAnchor className="h-10 w-8" stroke={2.5}/>
    <div className="text-2xl font-semibold">jobHook</div>    
</div>
<div className="text-sm text-mine-shaft-300 ">job portal with user profile skill updtae, certificate work
    experiances 
</div>
<div className="flex gap-3 text-amber-400 [&>div]: bg-mine-shaft-900 [&>div]:p-2 
[&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-700 ">
    <div ><IconBrandFacebook /></div>
    <div><IconBrandInstagram /></div>
    <div><IconBrandX/></div>
 </div>
   </div>
   {
    footerlinks.map((item,index) => <div key={index}>
      <div className="text-lg font-semibold mb-4 text-amber-400 ">{item.title}</div>
      {
        item.links.map((link,index) =><div key={index} className="text-mine-shaft-300 text-sm
         hover:text-amber-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-
         out">{link} </div> )
      }
      </div>  )
   }  
 </div>:<></>
}
export default Footer;