import { Avatar, Rating } from "@mantine/core"
import { Testimonials } from "../Data/Data";

const Testimonals =()=>{
    return <div className="mt-20 pb-5 p-5">
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100 "> what <span
        className="text-amber-400" > user</span> says about us</div>
       <div className="flex justify-evenly md-mx:flex-wrap gap-2 ">
        {
            Testimonials.map((data , index) => <div key={index} className="flex flex-col gap-3 w-[23%] border-b-orange-400 rounded-xl md-mx:w-[48%] xs-mx:w-full "> 
            <div className="flex gap-2 items-center">
                    <Avatar  className="!h-14 !w-14" src="avatar.png"  alt="its me " />
                 <div>
                    <div className= " text-mine-shaft-200 sm-mx:text-base xs-mx:text-sm text-xl font-semibold">{data.name}</div>
                   <Rating value={data.rating} fractions={2} readOnly />
                    </div>
                </div> 
                <div className="text-us text-mine-shaft-300 ">{data.testimonials}</div>
     </div> )   
 } 
      </div>
</div>
}
export default Testimonals;