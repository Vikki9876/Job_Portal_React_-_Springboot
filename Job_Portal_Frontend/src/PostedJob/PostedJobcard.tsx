import { Link ,useParams } from "react-router-dom";
import { timeAgo } from "../Services/Utilities";

const PostedJobcard=(props:any)=>{
    const {id}=useParams();
    return <Link  to={`/posted-job/${props.id}`} 
  className={`rounded-xl p-2 w-52 lg-mx:w-48 bs-mx:w-44  border-1-2  border-l-2 hover:bg-opacity-80 cursor-pointer border-l-amber-400 ${props.id == id ? "bg-bright-sun-400 text-black" : "bg-mine-shaft-900 text-mine-shaft-300"}`}>
<div className="bg-mine-shaft-900 rounded-xl p-2">{props.jobTitle}</div>
<div className="text-sm font-semibold ">{props.location}</div>
<div className="text-xs text-mine-shaft-300 ">
  {props.jobStatus=="DRAFT"?"Drafted":props.jobStatus=="CLOSED"?"Closed":"Posted"}
   {timeAgo(props.postTime)} </div>
 </Link>
}
export default PostedJobcard ;