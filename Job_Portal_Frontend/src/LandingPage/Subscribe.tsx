import { Button, TextInput } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const Subscribe =()=>{
  const matches=useMediaQuery('(max-width:639px)');
  const matches1=useMediaQuery('(max-width:475px)');
  return <><div className="mt-20 pb-5 flex items-center bg-mine-shaft-900 mx-20 py-3 sm-mx:mx-5 rounded-xl justify-
    around  flex-wrap ">
        <div className="text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl w-2/5 bs-mx:w-4/5 text-center font-semibold mb-3 text-mine-shaft-100 ">never wants to miss any 
            <span className="text-amber-400 ">Job news </span></div>
    <div className="flex gap-4 bg-mine-shaft-700 px-3 xs-mx:flex-col py-2 xs:items-center">
    <TextInput
            className="[&_input]:text-mine-shaft-100 font-semibold "
            variant="unstyled"
            placeholder="ahirevivek@gmail.com" 
            size={matches1?"sm":matches?"md":"xl"} />
    <Button className="!rounded-lg" size={matches?"md":"xl"} color="brigtSun.4" variant="filled"> Subscribe </Button>
  </div> 
  </div>     
</>
}
export default Subscribe ;