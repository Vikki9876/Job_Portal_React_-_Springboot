export const companies: string[] = [
  "Googles",
  "Amazon",
  "Figma",
  "Netflix",
  "Meta",
  "Microdoft",
  "Pinterest",
  "Slack",
  "Spotify",
  "Oracle",
  "Malmart"
];

interface WorkItem {
  name: string;
  desc: string;
}
export const work: WorkItem[] = [
  {
    "name": "Build your resume",
    "desc": "create a standout resume with your skills"
  },
  {
    "name": "Apply for job",
    "desc": "find and apply for jobs that match your skills "
  },
  {
    "name": "get hired ",
    "desc": "connect with employers and start your new job"
  }
];

interface tm {
  name: string;
  testimonials: string;
  rating: number; 
}
export const Testimonials : tm[] = [
  {
    "name": "abhishek mahajan",
    "testimonials": "This is job portal made job search easy and quick  ",
     "rating" : 5
  },
  {
    "name": "ram gopal verma",
    "testimonials": "Found my dream job wiithin a week ",
    "rating" : 3
  },
  {
    "name": "shiv krupa ",
    "testimonials": "This is best site in the world",
    "rating":4
  }
];

interface jb {
  name: string;
  desc: string;
  jobs: string; 
}
export const jobCategory : jb[] = [
  {
    "name": "digital marketting",
    "desc": "promote brands online with marketing strategies ",
     "jobs" : "2k"
  },
  {
    "name": "web developer",
    "desc": "Build and maintain websites for clients",
    "jobs" : "9k"
  },
  {
    "name": "Testing  & Automation testing  ",
    "desc": "design user interfaces and enahve user expe",
    "jobs":"2k"
  },
  {
    "name": " CI CD & devops ",
    "desc": "design user interfaces and enahve user expe",
    "jobs":"2k"
  },
  {
    "name": " jenkins & kubernates ",
    "desc": "design user interfaces and enahve user expe",
    "jobs":"2k"
  }
];

const footerlinks =[
  {title:"Product",links:["Find job","Find company" ,"Find Employe"] },
  {title :"Company" ,links:["About us" ,"Contact us" ,"privacy policy","terms & conditions" ]},
  {title: "Support" ,links: ["Help & support" ,"feedback","FAQ"] }
]


export const appName = "Job Finder Pro";

export {footerlinks };