import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import { content, fields } from "../Data/PostJob";
import SelectInput from "./SelectInput";
import TextEditor from "./TextEditor";
import { isNotEmpty, useForm } from "@mantine/form";
import { getJob, postJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";


const PostJob=()=>{
    const select=fields;
    const [editorData , setEditorData]=useState(content);
    const {id}=useParams();
    const user=useSelector((state:any)=>state.user);
    const matches= useMediaQuery('(min-width: 350px )');
    const navigate = useNavigate();
   useEffect(()=>{
      window.scrollTo(0,0);
      if(id!=="0")
      {  getJob(id).then((res)=>{
      form.setValues(res);
    setEditorData(res.description);
   }).catch((err)=>{
      console.log(err);
    }) 
   } 
   else form.reset();
}  , [id] )

    const form=useForm({
      mode:'controlled',
      validateInputOnChange:true,
      initialValues:{
         jobTitle:'',
         company:'',
         experience:'',
         jobType:'',
         location:'',
         packageOffered:'',
         skillsRequired: [] ,
         about:'',
         description:content
      },
      validate:{
         jobTitle:isNotEmpty("jobtitle is required") ,
         company:isNotEmpty("company is required"),
         experience:isNotEmpty("experience is required"),
         jobType:isNotEmpty("jobtype is required"),
         location:isNotEmpty("location is required"),
         packageOffered:isNotEmpty("packageoffered is required"),
         skillsRequired: isNotEmpty("skillsrequired is required") ,
         about:isNotEmpty("about is required") ,
         description:isNotEmpty("descriptoins is required")
      }
    });

    const handlePost=()=>{
      form.validate();
      if(!form.isValid())return ;
      postJob({...form.getValues(), id ,  postedBy:user.id, jobStatus:"ACTIVE"}).then((res)=>{
         successNotification("success","job posted succesfully") ;
         navigate(`/posted-job/${res.id}`);
      }).catch((err)=>{
         console.log(err);
         errorNotification("errro", err.response.data.errorMessage );
      } )
    }

    const handleDraft=()=>{
      postJob({...form.getValues(),id, postedBy:user.id, jobStatus:"DRAFT"}).then((res)=>{
         successNotification("success","job drafted succesfully") ;
         navigate(`/posted-job/${res.id}`);
      }).catch((err)=>{
         console.log(err);
         errorNotification("errro", err.response.data.errorMessage );
      } )
    }

    return <div className="px-16 bs-mx:px-10 md-mx:px-5 py-10">
        <div className="text-2xl font-semibold mb-5">Post a job</div>
        <div className="flex flex-col gap-5">
         <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap">
            <SelectInput form={form} name="jobTitle" {...select[0]}/>
            <SelectInput  form={form} name="company" {...select[1]}/>
         </div>
         <div className="flex gap-10 md-mx:px-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap ">
            <SelectInput form={form} name="experience" {...select[2]}/>
            <SelectInput form={form} name="jobType" {...select[3]}/>
         </div>
         <div className="flex gap-10 md-mx:px-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-wrap ">
            <SelectInput form={form} name="location" {...select[4]}/>
            <NumberInput {...form.getInputProps('packageOffered')}   label="salary" withAsterisk min={1} max={300} clampBehavior="strict" placeholder="enter salary" hideControls/>
         </div>
         <TagsInput {...form.getInputProps('skillsRequired')}  withAsterisk  label="skills"placeholder="enter skill" 
         splitChars={[',',' ','|']} clearable acceptValueOnBlur />
        <Textarea {...form.getInputProps('about')} withAsterisk className="my-3" label="Summary" 
        autosize minRows={2} placeholder="Enter about job"/>
        <div className="[&_button[data-active='true']]:!text-amber-400 [&_button[data-
        active='true]]:!bg-bright-sun-400/20">
        <div className="text-sm font-medium ">Job Description <span className="text-red-500" >*</span>  </div>
        <TextEditor form={form}  data={editorData} />
        </div>
        <div className="flex gap-4">
         <Button  color="brightSun.4" onClick={handlePost} variant="light">Publish Job</Button>
          <Button  color="brightSun.4" onClick={handleDraft} variant="light">save as Draft</Button>
        </div>
      </div>
    </div>
}
export default PostJob ;