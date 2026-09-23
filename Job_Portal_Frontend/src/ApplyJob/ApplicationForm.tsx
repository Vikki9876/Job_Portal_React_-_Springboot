import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput, Container } from "@mantine/core"
import { isNotEmpty, useForm } from "@mantine/form";
import { IconPaperclip } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBase64 } from "../Services/Utilities";
import { applyJob } from "../Services/JobService";
import { errorNotification, successNotification } from "../Services/NotificationService";
import {useSelector} from "react-redux";

const ApplicationForm = () => {
    const [preview, setPreview] = useState(false);
    const [submit, setSubmit] = useState(false);
    const { id } = useParams();
    const user=useSelector((state:any)=> state.user);
    const navigate=useNavigate();
    const handlePreview = () => {
        form.validate();
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (!form.isValid()) return;
        setPreview(!preview);
    }

    const handleSubmit = async () => {
        setSubmit(true);
            let resume: any = await getBase64(form.getValues().resume);
            let applicant ={...form.getValues() , applicantId:user.id, resume:resume.split(',')[1] };
            applyJob(id, applicant).then((res)=>{
            setSubmit(false);
            successNotification("Success", "Application submitted successfully");
            navigate("/job-history");
           }).catch((err)=> {
            setSubmit(false);
            errorNotification("Error", err.response.data.message );
            })
          }


    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            name: '',
            email: '',
            phone: '',
            website: '',
            resume: null,
            coverLetter: ''
        },
        validate: {
            name: isNotEmpty('Full Name cannot be empty'),
            email: isNotEmpty('Email cannot be empty'),
            phone: isNotEmpty('Phone cannot be empty'),
            website: isNotEmpty('Website cannot be empty'),
            resume: isNotEmpty('Resume cannot be empty')
        }
    });

    return (
        <Container size="sm" p="md" className="relative">
            <LoadingOverlay 
                visible={submit} 
                zIndex={1000} 
                overlayProps={{ radius: "sm", blur: 2 }} 
                loaderProps={{ color: 'brightSun.4', type: 'bars' }} 
            />

            <div className="text-xl font-semibold mb-6">Submit Your Application</div>
            
            <div className="flex flex-col gap-4">
                <div className="flex gap-10 md-mx:gap-5 [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-row flex-wrap ">
                    <TextInput 
                        {...form.getInputProps("name")} 
                        readOnly={preview} 
                        variant={preview ? "unstyled" : "default"}
                        label="Full Name" 
                        withAsterisk 
                        placeholder="Enter Name"
                        className="flex-1"
                    />
                    <TextInput 
                        {...form.getInputProps("email")} 
                        readOnly={preview} 
                        variant={preview ? "unstyled" : "default"}
                        label="Email" 
                        withAsterisk 
                        placeholder="Enter Email"
                        className="flex-1"
                    />
                </div>

                <div className="flex gap-10 md-mx:gap-5  [&>*]:w-1/2 sm-mx:[&>*]:!w-full sm-mx:flex-row flex-wrap ">
                    <NumberInput 
                        {...form.getInputProps("phone")} 
                        readOnly={preview} 
                        variant={preview ? "unstyled" : "default"}
                        label="Phone Number" 
                        withAsterisk 
                        placeholder="Enter phone number" 
                        hideControls 
                        className="flex-1"
                    />
                    <TextInput 
                        {...form.getInputProps("website")} 
                        readOnly={preview} 
                        variant={preview ? "unstyled" : "default"}
                        label="Personal Website" 
                        withAsterisk 
                        placeholder="https://example.com"
                        className="flex-1"
                    />
                </div>

                <FileInput 
                    {...form.getInputProps("resume")} 
                    accept="application/pdf" 
                    readOnly={preview} 
                    variant={preview ? "unstyled" : "default"}
                    withAsterisk 
                    leftSection={<IconPaperclip size={16} stroke={1.5} />}
                    label="Attach your CV" 
                    placeholder="Your CV" 
                />

                <Textarea 
                    {...form.getInputProps("coverLetter")} 
                    readOnly={preview} 
                    variant={preview ? "unstyled" : "default"}
                    withAsterisk 
                    placeholder="Type something about yourself..." 
                    label="Cover Letter"
                    autosize 
                    minRows={4}
                />

                <div className="mt-4">
                    {!preview ? (
                        <Button onClick={handlePreview} color="brightSun.4" variant="light" fullWidth>
                            Preview Application
                        </Button>
                    ) : (
                        <div className="flex gap-4">
                            <Button fullWidth onClick={handlePreview} color="gray" variant="outline">
                                Edit
                            </Button>
                            <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="filled">
                                Submit Application
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default ApplicationForm;