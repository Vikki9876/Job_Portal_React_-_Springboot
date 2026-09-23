import { Avatar } from "@mantine/core";
import { work } from "../Data/Data";

const Working=()=>{
    return <><div className="mt-20 pb-5">
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100 sm-mx:text-2xl xs-mx:text-xl  ">How it 
            <span className="text-amber-400 ">Works</span></div>
        <div className="text-lg xs-mx:text-sm mb-10 mx-auto text-mine-shaft-300 text-center w-1/2 sm-mx:w-11/12"> Effortlessly
            navigate through the process and land your dream job . 
            </div>
          <div className="flex  px-16 bs-mx:px-10 md-mx:flex-col md-mx:px-5 justify-between items-center ">
            
            
            <div className="relative">
            <img className="w-[30rem]" src="/Working/Girl.png" alt="girl"/>
            <div className="absolute w-36 flex xs-mx:w-28 top-[30%] right-[-20.5rem] flex-col items-center gap-1 border border-b-orange-400 rounded-xl py-3 px-1 backdrop-blur-md">
                <Avatar className="!h-16 !w-16 xs-mx:!h-12 xs-mx:!w-12 " src="Avatar1.png" alt="its me" />
                <div className="text-sm  sm-mx:text-xs  font-semibold text-mine-shaft-200 text-center" >
                    complete your profile </div>
                    <div className="text-xs text-mine-shaft-300 "> 70% completed </div>
                </div>
            </div>

         
        <div className="flex flex-col gap-10">
            {
                work.map((item,index) => <div className="flex items-center gap-4">
                <div className="p-2.5 bg-amber-300 rounded-full ">
                    <img  className="h-12 w-12 md-mx:w-9 md-mx:h-9 sm-mx:w-7 sm-mx:h-7" src={` /Working/${item.name}.png `} alt="" />
                </div>
                 <div>
                    <div className="text-mine-shaft-200 text-xl font-semibold md-mx:text-lg sm-mx:text-base ">{item.name}</div>
                    <div className="text-mine-shaft-300 md-mx:text-md sm:mx:text-xs "> { item.desc }</div>
                    </div>
                </div> )
            }
                </div>
                </div>
                </div>
        </>
}
export default Working ;



