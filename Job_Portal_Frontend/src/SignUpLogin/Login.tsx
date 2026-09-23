import { TextInput, rem, PasswordInput, Button, LoadingOverlay } from "@mantine/core";
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Removed Link
import { loginValidation } from "../Services/FormValidation";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import ResetPassword from "./ResetPassword";
import axios, { AxiosError } from "axios"; // Ensure AxiosError is imported
import { useDispatch } from "react-redux";
import { setUser } from "../Slices/UserSlice";
import { setJwt } from "../Slices/JwtSlice";
import { loginUser } from "../Services/AuthService";
import { jwtDecode } from "jwt-decode";

const Login = (props: any) => {
    const [loading,setLoading]=useState(false) ;
    const dispatch= useDispatch();

    const initialForm = {
        email: "",
        password: "",
    };
    const [data, setData] = useState<{ [key: string]: string }>(initialForm);
    const [formError, setFormError] = useState<{ [key: string]: string }>({});
    const [opened,{ open,close}]=useDisclosure(false) ; 
    const navigate = useNavigate();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormError({...formError,[event.target.name]:""});
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handleSubmit = () => {
        const newFormError: { [key: string]: string } = {};
        setLoading(true);
        let isValid = true; 
        for (let key in data) {
            const error = loginValidation(key, data[key]);
            if (error) {
                newFormError[key] = error;
                isValid = false;
            }
        }
        setFormError(newFormError);
        if (isValid) {
            setLoading(true);
            loginUser(data).then((res) => {
                    // Success Notification
                    notifications.show({
                        title: 'Login Successful', message: 'Redirecting to home page...', withCloseButton: true, icon: <IconCheck style={{ width: "90%", height: "90%" }} />, color: "teal", withBorder: true,  className: "!border-green-500"
                    });
                        setLoading(false);
                        dispatch(setJwt(res.jwt));
                        const decoded=jwtDecode(res.jwt) ;
                        console.log(decoded);
                        dispatch(setUser({...decoded, email:decoded.sub }));
                        setTimeout(() => {
                        navigate("/"); 
                    }, 500);
                })
                .catch((err: unknown) => { 
                  setLoading(false);
                    let displayMessage: string;
                    if (axios.isAxiosError(err)) {
                        const axiosError = err as AxiosError;
                        if (axiosError.response) {
                            const responseData = axiosError.response.data as any;
                            displayMessage = responseData?.errorMessage || responseData?.message || `Server Error (Status ${axiosError.response.status}).`;
                        } else {
                            displayMessage = "Could not connect to the server. Check your network or ensure the backend is running.";
                        }
                   console.error("Login Error Details:", axiosError);
                        
                    } else {
                        displayMessage = "An unexpected error occurred.";
                        console.error("Non-Axios Error:", err);
                    }
                 
                    notifications.show({
                        title: 'Login failed',
                        message: displayMessage, 
                        withCloseButton: true,
                        icon: <IconX style={{ width: "90%", height: "90%" }} />, 
                        color: "red", 
                        withBorder: true,
                        className: "!border-red-500"
                    });
                });
        }
    } 
    return ( 
    <><LoadingOverlay visible={loading} zIndex={1000} 
    overlayProps={{radius:'sm',blur:2 }}
    loaderProps={{color :'brightSun.4' ,type:'bars' }}/>
          <div className="w-1/2 sm-mx:w-full px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center gap-3">

            <div className="text-2xl font-semibold ">Login to your account </div>  
            <TextInput 
                value={data.email}  error={formError.email} name="email"  onChange={handleChange}  withAsterisk  leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}  label="Email"  placeholder="Your email" size="md" radius="md"
            />
            <PasswordInput 
                value={data.password}  error={formError.password} name="password"  onChange={handleChange}  withAsterisk  leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Password"  placeholder="Password" size="md" radius="md"
            />
            <Button loading={loading} onClick={handleSubmit} variant="filled" size="md" radius="md" color="yellow.6" autoContrast>
                Login
            </Button>
            
            <div className="text-center sm-mx:text-sm xs-mx:text-xs  text-sm text-gray-600">
                Don't Have an account?
                <span 
                    className="text-yellow-600 hover:text-yellow-700 hover:underline cursor-pointer font-medium ml-1" 
                    onClick={() =>{navigate("/signup"); setFormError(initialForm); setData(initialForm); }} 
                >
                    Signup
                </span>
            </div>
            <div 
                onClick={open} 
                className="text-yellow-600 hover:text-yellow-700 hover:underline cursor-pointer text-center text-sm font-medium sm-mx:text-sm xs-mx:text-xs " 
            >
                Forgot Password?
            </div>
        </div>
        <ResetPassword opened={opened} close={close} />
    </>
    );
};

export default Login;
