import { Indicator, Menu, rem  } from "@mantine/core";
import { IconBell, IconCheck  } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {  useSelector } from 'react-redux';
import {  useNavigate } from "react-router-dom";
import { Notification as MantineNotification } from '@mantine/core';
import { getNotifications, readNotification } from "../Services/NotiService";


const NotiMenu=()=>{
    const navigate =useNavigate();
 const user=useSelector((state:any )=>state.user);
 const [opened,setOpened]=useState(false);
const [notifications, setNotifications] = useState<any[]>([]);

 useEffect(()=>{
    getNotifications(user.id).then((res)=>{
        setNotifications(res);
    } ).catch((err)=>console.log(err) );
}, [user] )

const unread=(index:number)=>{
    let notis=[...notifications];
    notis=notis.filter((noti:any ,i:number)=>i!=index );
    setNotifications(notis);
    readNotification(notifications[index].id).then((res)=>console.log(res)).catch((err)=>console.log(err));
}


return <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      <Menu.Target>
    <div className="flex cursor-pointer items-center gap-2">
     <Indicator disabled={notifications.length<=0} color="brightSun.5" offset={6}  size={8} processing>
         <IconBell stroke={1.5} />
     </Indicator>
    </div>
    </Menu.Target>
  
      <Menu.Dropdown onChange={()=>setOpened(true)}>
   <div className="flex flex-col gap-1">

    {
    notifications.map((noti:any,index:number)=><MantineNotification 
    onClick={()=>{
        navigate(noti.route);
        unread(index);
        setOpened(false);
    } }
  key={index} className="hover:bg-mine-shaft-900 cursor-pointer" 
  onClose={()=>unread(index)} icon={<IconCheck style={{ width: rem(20), height: rem(20) }} />} 
  color="teal" title="All good!" mt="md">
  {noti.message}
   </MantineNotification>  
   )}

{
    notifications.length==0 && <div className="text-center text-mine-shaft-300 ">
        No Notifications </div>
}


   </div>

      </Menu.Dropdown>
    </Menu>
}
export default NotiMenu ;