import { IconCalendarMonth, IconHeart, IconMapPin } from "@tabler/icons-react";
import { Avatar, Button, Divider, Modal, Text } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { DateInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { changeAppStatus } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { formatInterviewTime, openBase64PDF } from "../Services/Utilities";

const TalentCard = (props: any) => {
  const [opened, { open, close }] = useDisclosure(false);
   const [app , { open : openApp , close : closeApp }] = useDisclosure(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("");
  const [profile, setProfile] = useState<any>({});
  const ref = useRef<HTMLInputElement>(null);
  const {id} =useParams();

  useEffect(() => {
    if (props.applicantId)getProfile(props.applicantId).then((res) => {
       console.log("Fetched Profile from API:", res);   
       setProfile(res);
        }).catch((err) => {
          console.log(err);
        })
    else setProfile(props);
    }, [props] )


const [date, setDate] = useState<Date | null>(null);

const handleDateChange = (value: string | null) => {
  if (value) {
    setDate(new Date(value));
  } else {
    setDate(null);
  }
};


const handleOffer = (status: string) => {
   let interview:any={id , applicantId:profile?.id ,applicationStatus:status , interviewTime:date };
  if(status=="INTERVIEWING"){
    const [hours, minutes] = time.split(":").map(Number);
   date?.setHours(hours ,minutes);
   interview={...interview , interviewime:date};
  }


   changeAppStatus(interview).then((res)=>{
    if(status=="INTERVIEWING")
    successNotification("inetrview Scheduled","interview Scheduled succesfully" );
    else if(status=="OFFERED")
    successNotification("offer","offer accepted" );
    else 
    successNotification("rejected","application rejected " );
    window.location.reload();
    }).catch((err)=>{
    console.log(err);
    errorNotification("error", err.response.data.errorMessage );
  })
}

  return (
    <div className="bg-mine-shaft-900 p-4 w-96 flex flex-col gap-3 rounded-xl hover:shadow-[0_0_5px_1px_yellow] !shadow-amber-400 transition duration-300 ease-in-out bs-mx:w-[48%] md-mx:w-full ">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <div className="p-2 bg-mine-shaft-800 rounded-full">
            <Avatar className="rounded-full"  size="lg"  src={profile?.picture ? `data:image/jpeg;base64,${profile?.picture}` : '/Avatart.png'}  />
          </div>
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg">{props.name}</div>
            <div className="text-sm text-mine-shaft-300"> {profile?.jobTitle}
               &bull; {profile?.company} </div>
          </div>
        </div>
        <IconHeart className="text-mine-shaft-300 cursor-pointer" stroke={1.5} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {profile?.skills?.map((skill: any, index: number) =>  index < 4 &&   <div key={index} 
        className="p-2 py-1 bg-mine-shaft-800 text-amber-400 rounded-lg text-xs">   {skill}
            </div>     )
        }
      </div>

      <div>
        <Text className="!text-xs text-justify !text-mine-shaft-300" lineClamp={3}>
          {profile?.about}
        </Text>
      </div>

      <Divider size="xs" color="mineShaft.7" />

      {props.invited ? (
        <div className="flex gap-1 text-mine-shaft-200 text-sm items-center">
          <IconCalendarMonth stroke={1.5} /> Interview : {formatInterviewTime(props.interviewTime) }
        </div>
      ) : (
        <div className="flex justify-between">
          <div className="font-semibold text-mine-shaft-300">Exp:{ props.totalExp?props.totalExp:1 } years </div>
          <div className="flex gap-1 text-xs text-mine-shaft-400 items-center">
            <IconMapPin className="h-5 w-5" />
            {profile?.location}
          </div>
        </div>
      )}

      <Divider size="xs" color="mineShaft.7" />

      <div className="flex [&>*]:w-1/2 [&>*]:p-1">
        {!props.invited && ( <>
            <Link to={`/talent-profile/${profile?.id}`}>
              <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
            </Link>
            <div>
              {props.posted ? (
                <Button
                  color="brightSun.4"
                  variant="light"
                  onClick={open}
                  rightSection={<IconCalendarMonth className="w-5 h-5" />}
                  fullWidth
                >
                  Schedule
                </Button>
              ) : (
                <Button color="brightSun.4" variant="light" fullWidth>Message</Button>
              )}
            </div>
          </>
        )}
        
        {props.invited && (
          <>
            <div>
              <Button color="brightSun.4" onClick={()=>handleOffer("OFFERED") } variant="outline" fullWidth>Accept</Button>
            </div>
            <div>
              <Button color="brightSun.4" onClick={()=>handleOffer("REJECTED") } variant="outline" fullWidth>Reject</Button>
            </div>
          </>
        )}
      </div>

      { (props.invited || props.posted)&&<Button color="brightSun.4" variant="filled"  fullWidth
      onClick={openApp}>View Application</Button> }

     
      <Modal opened={opened} onClose={close} radius="lg" title="Schedule Interview" centered>
        <div className="flex flex-col gap-4">
         <DateInput value={date ? date.toISOString().split("T")[0] : null} minDate={new Date()}  onChange={handleDateChange}  label="Date"   placeholder="Enter Date"/>
         <TimeInput label="Time" value={time} onChange={(event) => setTime(event.currentTarget.value)}  ref={ref} onClick={() => ref.current?.showPicker()} />
          <Button onClick={()=>handleOffer("INTERVIEWING")} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
        </div>
      </Modal>

        <Modal opened={app} onClose={closeApp} radius="lg" title="Application " centered>
        <div className="flex flex-col gap-4">
         <div>
          Email : &emsp;<a className="text-amber-400 hover:underline cursor-pointer text-center" href={`mailto:${props.email}`}>{props.email}</a>
         </div>
         <div>
          Website : &emsp;<a target="_blank" className="text-amber-400 hover:underline cursor-pointer text-center" href={props.website} >{props.website } </a>
         </div>
         <div>
          Resume : &emsp;<a className="text-amber-400 hover:underline cursor-pointer text-center" onClick={()=>openBase64PDF(props.resume)}>{props.name}</a>
         </div>
         <div>
          Cover Letter : &emsp;<div>{props.CoverLetter}</div>
         </div>
        </div>
      </Modal>
    </div>
  );
};

export default TalentCard;