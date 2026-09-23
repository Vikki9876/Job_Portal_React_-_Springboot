import { Button, Select, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields  from "../Data/Profile";
import { MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";
import { useMediaQuery } from "@mantine/hooks";

const CertiInput = (props: any) => {
  const matches=useMediaQuery('(min-width:475px)') ; 
  const dispatch=useDispatch();  
   const Select =fields;
   const profile=useSelector((state:any)=>state.profile);
   const form = useForm({
      mode: 'controlled',
      validateInputOnChange: true,
      initialValues : {
        name: '',
        issuer: '',
        issueDate: new Date() ,
        certificatedId: ''
         },
      validate: {
        name: isNotEmpty("name is required"),
        issuer: isNotEmpty("issuer is required"),
        issueDate : isNotEmpty("issueadate is required"),
        certificatedId : isNotEmpty( "certificateid is required" ),
        }
    });

  const select=fields ;
  const handleSave=()=>{
    form.validate();
    if (!form.isValid()) return;
    let certi=[...profile.certifications];
    certi.push(form.getValues()) ;
    certi[certi.length -1].issueDate=certi[certi.length-1].issueDate.toISOString();
    let updatedProfile={...profile , certifications : certi };
    props.setEdit(false) ; 
    dispatch(changeProfile(updatedProfile));
    successNotification("Success" , "certificate Added Succesfully") ;
  }
  
return <div className="flex flex-col gap-3">
    <div className="text-lg font-semibold ">Add certifications</div>
    <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3">
    <TextInput {...form.getInputProps("name")} withAsterisk placeholder="Enter title"/>
    <SelectInput form={form} name="issuer"{...select[1]}  />
     </div>
      <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap my-3 ">
     <MonthPickerInput withAsterisk {...form.getInputProps("issueDate") }   maxDate={ new Date()}  label="Start Date"  placeholder="Pick date"  
      />
       <TextInput {...form.getInputProps("certificatedId") } label="Certificate ID" withAsterisk placeholder="Enter ID" />
       </div>
     <div className="flex gap-5">
    <Button onClick={handleSave } color="green.8" variant="light">Save</Button>
    <Button color="red.8" onClick={()=> props.setEdit(false)} variant="light">Cancel</Button>          
     </div>
</div>
}

export default CertiInput;