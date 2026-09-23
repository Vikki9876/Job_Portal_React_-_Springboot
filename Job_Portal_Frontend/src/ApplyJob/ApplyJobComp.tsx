import { Divider, Paper } from "@mantine/core";
import ApplicationForm from "./ApplicationForm";
import { timeAgo } from "../Services/Utilities";

const ApplyJobPage = (props: any) => {

  return (
    <div className="w-2/3 bs-mx:w-4/5 sm-mx:w-full m-auto ">
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-mine-shaft-800 rounded-xl flex shrink-0">
            <img className="h-14 w-14 object-contain" src={`/Icons/${props.comapny}.png`} alt="Company Logo" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-bold text-3xl text-mine-shaft-100 xs-mx:text-xl ">{props.jobTitle}</div>
            <div className="text-lg text-mine-shaft-300 flex-wrap xs-mx:text-base ">
            <span> {props.company} &bull; </span><span>  {timeAgo(props.postTime)} &bull; </span><span> {props.applicants ? props.applicants.length : 0} Applicants </span>
            </div>
          </div>
        </div>
      </div>

      <Divider my="xl" />

      <Paper withBorder shadow="xs" p="xl" radius="md" className="bg-mine-shaft-900/50">
        <ApplicationForm />
      </Paper>
      
    </div>
  );
};

export default ApplyJobPage;