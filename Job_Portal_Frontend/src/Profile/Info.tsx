import { ActionIcon, NumberInput } from "@mantine/core";
import { IconPencil, IconBriefcase, IconMapPin, IconCheck, IconX } from "@tabler/icons-react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { useForm } from "@mantine/form"; 
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const Info = () => { 
    const select = fields;
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);
    const [edit, setEdit] = useState(false);
    const matches=useMediaQuery('(min-width:475px)') ;
       

    const form = useForm({
        mode: 'controlled',
        initialValues: { 
            jobTitle: '',
             company: '',
              location: '',
            totalExp:1  },
    });
    
    const saveProfile = () => {
        setEdit(false);
        const updatedProfile = { ...profile, ...form.getValues() };
        dispatch(changeProfile(updatedProfile));
        successNotification("success", "profile updated");
    };

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            form.setValues({ 'jobTitle': profile.jobTitle, 'company': profile.company, 'location': profile.location,
                'totalExp':profile.totalExp });
        } else {
            setEdit(false);
        }
    }

    const handleSave = () => {
        saveProfile();
    }
     if (!user) {
        return null; 
    }
     
    return (
        <>
            <div className="text-3xl xs-mx:text-2xl   font-semibold flex justify-between">
                {user.name} 
                <div> 
                    {edit && ( 
                        <ActionIcon onClick={handleSave} size={matches?"md":"lg"}  color="brightSun.4" variant="subtle"> 
                            <IconCheck className="h-4/5 w-4/5" stroke={1.5} /> 
                        </ActionIcon> 
                    )}
                    <ActionIcon onClick={handleClick} size={matches?"md":"lg"} color= {edit?"red.8":"brightSun.4"} variant="subtle" >
                        {edit ? 
                            <IconX className="h-4/5 w-4/5" stroke={1.5} /> : 
                            <IconPencil className="w-4/5 h-4/5" stroke={1.5} /> 
                        } 
                    </ActionIcon>
                </div>
            </div>

            {edit ? (
                <> 
                    <div className="flex gap-10 md-mx:gap-5 [&>*]: w-1/2 [&>*]:w-full xs-mx:w-full xs-mx:flex-wrap my-3">
                        <SelectInput form={form} name="jobTitle" {...select[0]} />
                        <SelectInput form={form} name="company" {...select[1]} />
                    </div>
                    <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap  my-3"> 
                    <SelectInput name="location" form={form} {...select[2]} />
                    <NumberInput label="Experience" withAsterisk hideControls clampBehavior="strict" min={1} max={50} 
                    {...form.getInputProps('totalExp')} />
                    </div>
                </>
            ) : (
                <> 
                    <div className="text-xl xs-mx:text-base flex gap-1 items-center "> 
                        <IconBriefcase className="h-5 w-5" stroke={1.5} /> {profile.jobTitle} &bull; {profile.company} 
                    </div>
                    <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-300">
                        <IconMapPin className="h-5 w-5" stroke={1.5} />{profile.location}
                    </div>
                    <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-300">
                        <IconBriefcase className="h-5 w-5" stroke={1.5} />Experience:  {profile.totalExp}
                    </div>
                </>
            )}
        </>
    )
}; 
export default Info;