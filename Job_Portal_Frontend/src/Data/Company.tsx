
interface cm {
  name: string;
  Overview: string;
  industry: string;
  website: string;
  size: string;
  Headquters: string;
  Specialities: string[];
}

export const companyData: cm = { // This is the actual data object
  name: "google",
  Overview: "gogle is best ",
  industry: "Internet softwrae ",
  website: "https://www.gopgle.com",
  size: "100+ employees",
  Headquters: "Mountain view , california ",
  Specialities: [
    "search engine",
    "online Advertising",
    "cloud comuting",
    "softwrae",
    "Ai & machiene learning",
    "mobile operating system ",
  ],
};



interface sm {
  name: string;
  employees: number ;
}


 export const similar: sm []= [
 {
   name : "meta" ,
  employees : 2900,
 } ,
 {
  name:"netflix",
  employees:12800,
 },
 {
  name:"facebook",
  employees:800,
 },
 {
  name:"Microsoft",
  employees:100,
 },
 {
  name:"Apple",
  employees:1300,
 }
 ]

// This line is what makes companyData (and similar) available to be imported as a VALUE
export default { similar, companyData };