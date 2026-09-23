import { ActionIcon } from "@mantine/core";
import { IconPlus, IconPencil, IconX } from "@tabler/icons-react";
import CertiCard from "./CertiCard";
import CertiInput from "./CertiInput";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { match } from "assert";

const Certificate = () => {
    const matches=useMediaQuery('(min-width:475px)') ;
    const [addCerti, setAddCerti] = useState(false);
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
 
    const handleClick = () => {
        setEdit(!edit);
    }

    return (
        <div>
            <div className="text-2xl font-semibold mb-4 flex justify-between">
                certifications
                <div className="flex gap-2">
                   <ActionIcon  onClick={() => setAddCerti(true)}  size={matches?"md":"lg"}  color="brightSun.4"  variant="subtle">
                   <IconPlus className="h-4/5 w-4/5" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon onClick={handleClick}  color={edit ? "red.8" : "brightSun.4"}  size={matches?"md":"lg"} >
                        {edit ? (
                            <IconX className="h-4/5 w-4/5" stroke={1.5} />
                        ) : (
                            <IconPencil className="h-4/5 w-4/5" stroke={1.5} />
                        )}
                    </ActionIcon>
                </div>
            </div>
            <div className="flex flex-col gap-8">
                { profile?.certifications?.map((certi: any, index: number) => (
                    <CertiCard   key={index} index={index}  edit={edit}   {...certi}  />
                ))}
              {addCerti && <CertiInput setEdit={setAddCerti} />}
            </div>
        </div>
    );
}

export default Certificate;