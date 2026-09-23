import { Avatar, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const DreamJob = () => {
  return (
    <div className="flex sm-mx:flex-col-reverse justify-between items-start px-16 bs-mx:px-10 md-mx:px-5">

      <div className="flex flex-col w-[45%] sm-mx:w-full gap-3">
        <div className="text-6xl bs-mx:text-5xl md-mx:text-4xl sm-mx:text-3xl font-bold text-mine-shaft-100 [&>span]:text-amber-500">
          find your <span> dream </span> dream job with us
        </div>
        <div className="text-lg md:mx:text-base sm-mx:text-sm    text-mine-shaft-100">
          good life begins with good company start explore thousands of jobs in one place
        </div>
        
        <div className="flex gap-3 items-center">
          <TextInput className="bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Title" placeholder="soft enginneer"/>
          <TextInput className="bg-mine-shaft-900 h-full rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100" variant="unstyled" label="Job Type" placeholder="Input placeholder"/>
        </div>
        
        <div className="flex items-center justify-center h-full w-20 bg-amber-500 text-mine-shaft-100 rounded-lg p-2 hover:bg-amber-900">
          <IconSearch className="h-[85%] w-[85%]" />
        </div>

      </div>


<div className="w-[55%] sm-mx:w-full flex justify-end items-start">
        <div className="w-[30rem] max-w-full">
          <img src="/Boy.png"  alt="Illustrative boy" className="w-full h-auto object-contain" />
          
      <div className="absolute left-1/2 -translate-x-1/2 top-[10%] w-fit border-b-orange-400 border rounded-lg p-2 backdrop-blur-md flex flex-col items-center justify-center">
    <div className="text-center mb-1 text-sm text-mine-shaft-100">10K+ got jobs</div>
    <Avatar.Group>
        <Avatar src="avatar-7.png" />
        <Avatar src="avatar-8.png" />
        <Avatar src="avatar-9.png" />
        <Avatar>+5</Avatar>
    </Avatar.Group>
</div>


          <div className="absolute left-20  w-fit bs-mx:top-[35%] xs-mx:top-[10%] sm-mx:left-5 xs-mx:!right-0  tip-[50%] border-b-orange-400 
          border rounded-lg p-2 backdrop-blur-md gap-3 flex-col">
        
         <div className="flex gap-2 items-center"> 
          <div className="w-12 h-12 p-1 bg-mine-shaft-900 rounded-lg ">
            <img src="/Google.png" alt=""/>
          </div>
         <div className="text-sm text-mine-shaft-100">
            <div>Software Engineer</div>
            <div className="text-mine-shaft-200 text-xs">new york</div>
          </div>
          </div>
         <div className="flex gap-2 text-mine-shaft-200 text-xs">
            <span> 1 day ago</span>
            <span>120 applications </span>
          </div>
        </div>
       </div>
        </div>
        </div>
  );
}

export default DreamJob;
