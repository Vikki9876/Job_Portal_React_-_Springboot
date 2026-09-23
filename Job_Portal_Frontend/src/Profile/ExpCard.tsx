import { Button } from "@mantine/core";
import { useState } from "react";
import ExpInput from "./ExpInput";
import { formDate } from "../Services/Utilities";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../Services/NotificationService";
import { changeProfile } from "../Slices/ProfileSlice";

const ExpCard = (props: any) => {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile);

    const handleDelete = () => {
        let exp = [...profile.experience];
        exp.splice(props.index, 1);
        let updatedProfile = { ...profile, experience: exp };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Experience deleted Succesfully");
    }

     return !edit ? (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2 flex-wrap">
                <div className="flex gap-2 items-center">
                    <div className="p-2 bg-mine-shaft-800 rounded-md ">
                        <img className="h-7 " src={`/Icons/${props.company}.png`} alt={`${props.company} logo`} />
                    </div>
                    <div className="flex flex-col">
                        <div className="font-semibold">{props.title}</div>
                        <div className="text-sm text-mine-shaft-300 ">
                            {props.company}
                            &#x2022; {props.location}
                        </div>
                    </div>
                </div>
                <div className="text-sm   text-mine-shaft-300 "> 
       {formDate(props.startDate)} - {props.working?"present":formDate(props.endDate)} </div>
            </div>
            <div className="text-justify text-sm  xs-mx:text-xs   text-mine-shaft-300 ">
                {props.description}
            </div>
            
            {props.edit && (
                <div className="flex gap-5">
                    <Button 
                        color="brightSun.4" 
                        onClick={() => setEdit(true)} 
                        variant="outline" 
                    >
                        Edit
                    </Button>
                    <Button 
                        color="red.8" 
                        onClick={handleDelete} 
                        variant="light"
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    ) : (
        
        <ExpInput 
            key={props.index} 
            {...props} 
            setEdit={setEdit} 
        />
    );
}

export default ExpCard;