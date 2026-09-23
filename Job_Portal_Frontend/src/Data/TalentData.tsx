import { IconMapPin, IconRecharging,IconSearch, TablerIcon } from "@tabler/icons-react"

export interface SearchField {
    title: string;
    icon: TablerIcon;
    options: string[];
}

export const searchFields: SearchField[] = [
    {
        title: "Job Title", 
        icon: IconSearch,
        options: [
            'Designer',
            'Developer',
            'Product Manager',
            'Marketing Specialist',
            'Data Analyst',
            'Sales Executive',
            'Content Writer',
            'Customer Support'
        ]
    },
    {
        title: "Location",
        icon: IconMapPin,
        options: [
            'Delhi',
            'New York',
            'San Francisco',
            'London',
            'Berlin',
            'Tokyo',
            'Sydney',
            'Toronto'
        ]
    },
    {
        title: "Skills",
        icon: IconRecharging,
        options: [
            "HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "Python",
            "Java", "Ruby", "PHP", "SQL", "MongoDB", "PostgreSQL", "Git",
            "API Development", "Testing and Debugging", "Agile", "Methodologies",
            "DevOps", "AWS", "Azure", "Google Cloud"
        ]
    },
];

export interface Talent {
    name: string;
    role: string;
    company: string;
    topSkills: string[];
    about: string;
    expectedCtc: string; 
    location: string;
    image: string;
}

export const talents: Talent[] = [
    {
        name: "Jarrod Wood",
        role: "Software Engineer",
        company: "Google",
        topSkills: ["React", "Spring Boot", "MongoDB"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Daemon Knox",
        role: "Software Developer",
        company: "Amazon",
        topSkills: ["React", "Spring Boot", "MongoDB"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Jamie Luther",
        role: "Frontend Developer",
        company: "Flipkart",
        topSkills: ["JSP", "Spring MVC", "MySQL"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Aemond Trex",
        role: "System Engineer",
        company: "KPIT",
        topSkills: ["C#", "Spring Boot", "MySQL"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Loren Symo",
        role: "System Engineer",
        company: "Zebronics",
        topSkills: ["C++", "Spring Framework", "SQL"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    },
    {
        name: "Samo Ryme",
        role: "Backend Engineer",
        company: "Telesco",
        topSkills: ["C++", "Spring Framework", "SQL"],
        about: "As a software engineer I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies.",
        expectedCtc: "48-60LPA",
        location: "New York, United States",
        image: "avatar"
    }
];

interface Profile {
  name: string;
  role: string;
  company: string;
  location: string;
  about: string;
  skills: string[];
  experiences: ExperienceItem[]; 
  certifications: CertificationItem[];
}

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  startDate: string;  
   endDate: string;   
    description: string;
}

interface CertificationItem {
  name: string;
  issuer: string;
  issueDate: string;
  certificatedId: string; 
}

export const profile : Profile = {
  name: "jarrod wood",
  role: "software engineer", 
  company: "google",
  location: "new york, united states", 
  about: "as a software engineer at google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experience with a strong foundation in React and Spring Boot, and a focus on MongoDB for database solutions.", // Corrected spelling and grammar
  skills: ["react", "springboot", "mongodb", "Html", "css", "javascript", "node.js", "express", "mysql", "python", "django"], // Corrected spelling
  experiences: [
    {
      title: "software engineer", 
      company: "google",
      location: "new york, us",
      startDate: "apr 2022",
      endDate: "present",
      description: "at google I worked on developing and optimizing cloud-based applications, focusing on enhancing performance and scalability. I collaborated with product managers and designers to create innovative features that improved user engagement." // Corrected spelling and grammar
    },
    {
      title: "software engineer", 
      company: "microsoft",
      location: "new york, us",
      startDate: "apr 2022",
      endDate: "present",
      description: "at microsoft I worked on developing and optimizing cloud-based applications, focusing on enhancing performance and scalability. I collaborated with product managers and designers to create innovative features that improved user engagement." // Corrected spelling and grammar
    }
  ],
  certifications: [
    {
      name: "google professional cloud architect", 
      issuer: "google",
      issueDate: "Aug-2023",
      certificatedId: "CB7588hhsj"
    },
    {
      name: "microsoft certified, cloud architect", 
      issuer: "microsoft",
      issueDate: "Aug-2023",
      certificatedId: "MMJK56k"
    }
  ]
};
