import { IconBriefcase, IconMapPin, IconRecharging, icons, IconSearch } from "@tabler/icons-react";
import { title } from "process";

const dropdowndata =[
        {  title :"job title",icon : IconSearch , options : ['Designer' ,'Developer','product manager' ,
            'Marketting specialist' ,'data abalystr','sales executeie' ] },
            {
                title :"Location",icon: IconMapPin , options :['Delhi' , 'new york ','san francsico' ,'london'] },
                { title : "experiance",icon :IconBriefcase ,options :['Entry-level' ,'Intermediate' ,'expert'] },
                { title : "job type" ,icon : IconRecharging ,options :['Full time' ,'part time' ,'contract', 'freelance' ,'Interniship' ] }

          ];

const jobList=[
{
    jobTitle :"ios developer",
    company:"Adobe",
    applicants : 90,
    experiance :"Intermediate",
    jobType : "Full-time",
    location : "tinoaino",
    package : "89 lpa",
    postedDaysAgo : 9,
    description :"fintech is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"ios developer",
    company:"Amazon",
    applicants : 20,
    experiance :"expert",
    jobType : "Full-time",
    location : "gthas",
    package : "67 lpa",
    postedDaysAgo : 10,
    description :"facebook is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"devoops developer",
    company:"Apple",
    applicants : 70,
    experiance :"intermediate",
    jobType : "Full-time",
    location : "jpneas",
    package : "58 lpa",
    postedDaysAgo : 9,
    description :"dell is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"software developer",
    company:"Google",
    applicants : 10,
    experiance :"expert",
    jobType : "Full-time",
    location : "kalpsi",
    package : "7 lpa",
    postedDaysAgo : 19,
    description :"apple is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"backend developer",
    company:"Meta",
    applicants : 20,
    experiance :"expert",
    jobType : "Full-time",
    location : "delapyia",
    package : "42 lpa",
    postedDaysAgo : 7,
    description :"spotify  is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"frontend developer",
    company:"Microsoft",
    applicants : 50,
    experiance :"Intermediate",
    jobType : "Full-time",
    location : "seattle",
    package : "36 lpa",
    postedDaysAgo : 7,
    description :"Amazon is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
,
{
    jobTitle :"ios developer",
    company:"Netflix",
    applicants : 30,
    experiance :"expert",
    jobType : "Full-time",
    location : "cupertino",
    package : "42 lpa",
    postedDaysAgo : 7,
    description :"apple is seeking an ios developer to join our team in cupertino wou will work on cuuting -age  applications for ios devices  "
   }
 ] ;

export {dropdowndata, jobList};