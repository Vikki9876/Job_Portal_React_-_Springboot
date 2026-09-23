import {Anchor,Button,Checkbox,Group,LoadingOverlay,PasswordInput,Radio,rem,TextInput} from "@mantine/core";
import { IconAt, IconCheck, IconLock } from "@tabler/icons-react";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../Services/UserService";
import { signupValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";

const SignUp = () => {
  const initialForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
  };

  const [data, setData] = useState<{ [key: string]: string }>(initialForm);
  const [formError, setFormError] = useState<{ [key: string]: string }>({});
  const navigate=useNavigate(); 
  const [loading ,setLoading]=useState(false);
  
  
  const handleChange = (event: any) => {
    if (typeof event === "string") {
      setData({ ...data, accountType: event });
      return;
    }

    const name = event.target.name;
    const value = event.target.value;

    setData({ ...data, [name]: value });
    if (formError[name]) {
      const updatedErrors = { ...formError };
      if (name === "confirmPassword") {
        updatedErrors.confirmPassword =
          value !== data.password ? "Passwords do not match." : "";
      } else if (name === "password") {
        updatedErrors.password = signupValidation(name, value);
        if (data.confirmPassword && data.confirmPassword !== value) {
          updatedErrors.confirmPassword = "Passwords do not match.";
        } else {
          updatedErrors.confirmPassword = "";
        }
      } else {
        updatedErrors[name] = signupValidation(name, value);
      }

      setFormError(updatedErrors);
    }
  };

  const handleSubmit = () => {
    setLoading(true); 
    const newFormError: { [key: string]: string } = {};
    let valid = true;
    
    for (let key in data) {
      if (key === "accountType") continue;
      if (key !== "confirmPassword") {
        const error = signupValidation(key, data[key]);
        if (error) {
          newFormError[key] = error;
          valid = false;
        }
      } else {
        if (data.confirmPassword !== data.password) {
          newFormError.confirmPassword = "Passwords do not match.";
          valid = false;
        }
      }
    }

    setFormError(newFormError);
    
    if (!valid) {
        setLoading(false); 
        return; 
    }

    const { confirmPassword, ...payload } = data; 
    if (valid) {
      registerUser(payload).then((res) => {
        console.log("Registration successful:", res);
        setData(initialForm);
        notifications.show({
          title:'Registration Succesfully',
          message:'Redirecting to login page...',
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"teal",
          withBorder:true,
          className:"!border-green-500"
        })
        setTimeout(()=>{
          setLoading(false); 
          navigate("/login");
        },4000 )
      }).catch((err) => {
        setLoading(false) ; 
        console.log("Registration failed:", err);
        notifications.show({
          title:'Registration failed',
          message: err.response.data.errorMessage,
          withCloseButton:true,
          icon:<IconCheck style={{width:"90%",height:"90%"}}/>,
          color:"red",
          withBorder:true,
          className:"!border-green-500"
        })
      });
    }
};


  return ( <> <LoadingOverlay visible={loading} zIndex={1000} 
    className="translate-x-1/2"  
    overlayProps={{radius:'sm',blur:2 }}
      loaderProps={{color :'brightSun.4' ,type:'bars' }}/>
       
    <div className="w-1/2 sm-mx:p-10 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold">Create account</div>

      <TextInput
        value={data.name}
        error={formError.name}
        onChange={handleChange}
        name="name"
        label="Full Name"
        withAsterisk
        placeholder="Your name"
      />

      <TextInput
        value={data.email}
        error={formError.email}
        onChange={handleChange}
        name="email"
        withAsterisk
        leftSection={
          <IconAt style={{ width: rem(16), height: rem(16) }} />
        }
        label="Email"
        placeholder="Your email"
      />

      <PasswordInput
        value={data.password}
        error={formError.password}
        onChange={handleChange}
        name="password"
        withAsterisk
        leftSection={
          <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label="Password"
        placeholder="Password"
      />

      <PasswordInput
        value={data.confirmPassword}
        error={formError.confirmPassword}
        onChange={handleChange}
        name="confirmPassword"
        withAsterisk
        leftSection={
          <IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        }
        label="Confirm Password"
        placeholder="Confirm Password"
      />

      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are?"
        description="This is anonymous"
        withAsterisk
      >
        <Group mt="xs">
          <Radio name="accountType"
             className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-b-orange-400/5 has-[:checked]:border-b-orange-400 border-mine-shaft-800 rounded-lg sm-mx:px-4 sm-mx:py-2"
            autoContrast
            value="APPLICANT"
            label="Applicant"
          />
          <Radio name="accountType"
            className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-b-orange-400/5 has-[:checked]:border-b-orange-400 border-mine-shaft-800 rounded-lg sm-mx:px-4 sm-mx:py-2 "
            autoContrast
            value="EMPLOYER"
            label="Employer"
          />
        </Group>
      </Radio.Group>

      <Checkbox
        autoContrast
        label={
          <>
            I accept <Anchor>terms and conditions</Anchor>
          </>
        }
      />

      <Button loading={loading}  onClick={handleSubmit} autoContrast variant="filled">
        Sign up
      </Button>

      <div className="text-center sm-mx:text-sm xs-mx:text-xs  ">Have an account?
  <span className="text-amber-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs " onClick={() =>{navigate("/login"); setFormError(initialForm); setData(initialForm); }} >
          Login
        </span>
      </div>
    </div> </>
  );
};

export default SignUp;
