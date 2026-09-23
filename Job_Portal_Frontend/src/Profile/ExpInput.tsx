import { MonthPickerInput } from "@mantine/dates";
import { useEffect } from "react";
import fields from "../Data/Profile";
import SelectInput from "./SelectInput";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { changeProfile } from "../Slices/ProfileSlice";
import { successNotification } from "../Services/NotificationService";

 const ExpInput = (props: any) => {
  const select = fields;
  const dispatch = useDispatch();
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      title: '',
      company: '',
      location: '',
      description: '',
      startDate: new Date(),
      endDate: null as Date | null,
      working: false
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
      endDate: (value: Date | null, values: { working: boolean, endDate: Date | null }) => {
        if (!values.working && !value) {
          return "End Date is required";
        }
        return null;
      }
    }
  });

  useEffect(() => { 
    if (!props.add && props.title) {
      form.setValues({
        title: props.title, 
        company: props.company,
        location: props.location,
        description: props.description, 
        startDate: props.startDate ? new Date(props.startDate) : new Date(),
        endDate: props.endDate ? new Date(props.endDate) : null,
        working: props.working 
      });
    }
  }, [props.add, props.title, props.startDate, props.endDate, props.working]); 

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;

    let exp = [...(profile.experience || [])]; 
    const formData = form.getValues();
    const safeToISOString = (dateValue: Date | null) => {
        if (dateValue && dateValue instanceof Date) {
            return dateValue.toISOString();
        }
        return null;
    };
    
    const saveObject = {
      ...formData,
      startDate: safeToISOString(formData.startDate),
        endDate: formData.working 
        ? null 
        : safeToISOString(formData.endDate),
    };


    if (props.add) {
      exp.push(saveObject);
    } else {
      exp[props.index] = saveObject;
    }

    let updatedProfile = { ...profile, experience: exp }; 
      props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", `Experience ${props.add ? "Added" : "updated"} Successfully`);
  }
   const currentlyWorking = form.getValues().working; 

  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold ">{props.add?"Add":"Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea {...form.getInputProps('description')} label="Summary" autosize 
        minRows={2} placeholder="Enter summary" />
      <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 xs-mx:[&>*]:w-full xs-mx:flex-wrap  my-3">
        <MonthPickerInput {...form.getInputProps("startDate")} withAsterisk maxDate={form.getValues().endDate || undefined} label="Start Date" placeholder="Pick date" />
        <MonthPickerInput 
            {...form.getInputProps("endDate")} 
            disabled={currentlyWorking} 
            minDate={form.getValues().startDate || undefined} 
            maxDate={new Date()} 
            withAsterisk={!currentlyWorking} 
            label="End Date" 
            placeholder="Pick date"
        />
      </div>
      <Checkbox 
        {...form.getInputProps("working", { type: 'checkbox' })}
        label="Currently working here"
        autoContrast
        onChange={(event) => {
          const isWorking = event.currentTarget.checked;
          
          form.setFieldValue("working", isWorking);
          
          if (isWorking) {
            form.setFieldValue("endDate", null);
            form.clearFieldError("endDate");
          } else {
             form.validateField('endDate');
          }
        }}
      />
      <div className="my-3 flex gap-5" >
        <Button onClick={ handleSave } color="green.8" variant="light">Save</Button>
        <Button color="red.8" onClick={()=>props.setEdit(false)} variant="light">Cancel</Button>
      </div>
    </div>
  );
};

export default ExpInput;