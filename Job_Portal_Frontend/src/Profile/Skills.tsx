import { ActionIcon, TagsInput } from "@mantine/core";
import { IconCheck, IconX, IconPencil } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";
import { useMediaQuery } from "@mantine/hooks";

const Skills = () => {

    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile); 
    const [skills, setSkills] = useState<string[]>(profile?.skills || []); 
    const matches=useMediaQuery('(min-width:475px)') ;
        
    useEffect(() => {
        if (profile?.skills) {
            setSkills(profile.skills);
        }
    }, [profile?.skills]);

    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile?.skills || []); 
        } else {
            setEdit(false);
            setSkills(profile?.skills || []);
        }
    }

    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills: skills };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Skills updated successfully");
    }

    return (
        <div className="px-3">
            <div className="text-2xl font-semibold mb-3 flex justify-between">
                Skills
                <div>
                    {edit && (
                        <ActionIcon onClick={handleSave} size={matches?"md":"lg"} color="brightSun.4" variant="subtle">
                            <IconCheck className="h-4/5 w-4/5" stroke={1.5} />
                        </ActionIcon>
                    )}
                    <ActionIcon onClick={handleClick} size="lg" color={edit ? "red.8" : "brightSun.4"} variant="subtle" >
                        {edit ?
                            <IconX className="h-4/5 w-4/5" stroke={1.5} /> :
                            <IconPencil className="w-4/5 h-4/5" stroke={1.5} />
                        }
                    </ActionIcon>
                </div>
            </div>

            {edit ?
                <TagsInput value={skills} onChange={setSkills} placeholder="Add skill"
                    splitChars={[',', ' ', '|']} />
                : <div className="flex flex-wrap gap-2">
                    {
                        (profile?.skills || []).map((skill: any, index: number) => 
                            <div key={index}
                                className="bg-amber-300 text-sms bg-opacity-15 rounded-3xl text-amber-400 font-medium text-sm px-3 py-1 ">
                                {skill}
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}

export default Skills;