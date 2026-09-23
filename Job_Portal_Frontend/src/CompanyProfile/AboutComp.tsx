import { companyData } from "../Data/Company";


const AboutComp=()=>{
const company:{[key:string]: any}= companyData ;
return <div>
{
  Object.keys(company).map((key,index) => key!='name' &&<div key={index}>
    <div className="text-xl mb-3 font-semibold">{key}</div>
    {key!="Website" &&<div className="text-sm text-mine-shaft-300 text-justify">{key!="Specialities" ?
    company[key]:company[key].map((item:string, index:number)=><span key={index}>&bull; </span>)}</div>}
    {key=="Website" &&<a href={company[key]} target="_blank" className="text-sm text-mine-shaft-300 text-justify">{company[key]}</a>}
    </div>)
   }
    </div>
}
export default AboutComp;