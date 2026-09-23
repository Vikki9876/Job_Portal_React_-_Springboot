import { Avatar, Button, Divider } from "@mantine/core";
import { IconBriefcase, IconMapPin } from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../Services/ProfileService";
import { useMediaQuery } from "@mantine/hooks";

const Profile = (props: any) => {
    const matches = useMediaQuery('(max-width:475px)');
    const { id } = useParams();
    const [profile, setProfile] = useState<any>({});

    useEffect(() => {
        window.scrollTo(0, 0);
        getProfile(id).then((res) => {
            setProfile(res);
        }).catch((err) => {
            console.log(err);
        })
    }, [id])

    return (
        <div className="w-2/3 lg-mx:w-full">
            {/* Header Section */}
            <div className="relative">
                {/* Fixed: Removed hardcoded width/height style to let Tailwind handle responsiveness */}
                <img 
                    className="rounded-t-2xl w-full h-48 md:h-56 lg:h-64 object-cover" 
                    src="/Profile/banner.jpg" 
                    alt="Banner" 
                />
                
                {/* Avatar Positioning */}
                <div className="absolute -bottom-16 left-6 md:-bottom-20 z-10"> 
                    <Avatar 
                        className="!w-32 !h-32 md:!w-40 md:!h-40 lg:!w-48 lg:!h-48 border-mine-shaft-950 border-8 rounded-full bg-mine-shaft-950" 
                        src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "/Avatar.png"} 
                        alt="Profile Picture" 
                    />
                </div>
            </div>

            {/* Profile Info Section - Added dynamic top margin to clear the Avatar */}
            <div className="px-3 mt-20 md:mt-24 lg:mt-28">
                <div className="text-3xl xs-mx:text-2xl font-semibold flex justify-between items-center">
                    {profile?.name} 
                    <Button size={matches ? "sm" : "md"} color="brightSun.4" variant="light">
                        Message
                    </Button> 
                </div>

                <div className="text-xl flex gap-1 items-center mt-2 xs-mx:text-base"> 
                    <IconBriefcase className="h-5 w-5" stroke={1.5} /> 
                    {profile?.jobTitle} &bull; {profile?.company} 
                </div>
                
                <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-300">
                    <IconMapPin className="h-5 w-5" stroke={1.5} />
                    {profile?.location}
                </div>
                
                <div className="text-lg xs-mx:text-base flex gap-1 items-center text-mine-shaft-300">
                    <IconBriefcase className="h-5 w-5" stroke={1.5} />
                    Experience: {profile?.totalExp} years
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* About Section */}
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify leading-relaxed">
                    {profile?.about}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* Skills Section */}
            <div className="px-3">
                <div className="text-2xl font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {profile?.skills?.map((skill: any, index: any) => (
                        <div key={index} className="bg-amber-300 text-xs bg-opacity-15 rounded-3xl text-amber-400 px-3 py-1 font-medium">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* Experience Section */}
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-8">
                    {profile?.experience?.map((exp: any, index: any) => (
                        <ExpCard key={index} {...exp} />
                    ))}
                </div>
            </div>

            <Divider mx="xs" my="xl" />

            {/* Certifications Section */}
            <div className="px-3">
                <div className="text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-8">
                    {profile?.certifications?.map((certi: any, index: any) => (
                        <CertiCard key={index} {...certi} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Profile;