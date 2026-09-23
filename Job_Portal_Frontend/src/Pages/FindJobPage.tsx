import { Divider } from "@mantine/core";
import SearchBar from "../FindJobs/SearchBar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Jobs from "../FindJobs/Jobs";


const FindJobPage=()=>{
    return ( 
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['-poppins']" >  
         <SearchBar/>
         <Divider size="xs" mx="md" />
         <Jobs/>
        </div>
   )
}
export default FindJobPage ;