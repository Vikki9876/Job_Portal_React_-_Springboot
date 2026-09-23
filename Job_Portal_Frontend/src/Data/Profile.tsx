import { IconBriefcase, IconMapPin, type Icon } from "@tabler/icons-react";

type IconComponent = Icon;

export interface Field {
  label: string;
  placeholder: string;
  options?: string[];
  leftSection: IconComponent;
}

const fields: Field[] = [
  {
    label: "Job Title",
    placeholder: "Enter Job title",
    options: [
      "Designer",
      "Developer",
      "Product Manager",
      "Marketing",
      "Specialist",
      "Data Analyst",
      "Sales Executive",
      "Content Writer",
      "Customer Support",
    ],
    leftSection: IconBriefcase,
  },
  {
    label: "Company",
    placeholder: "Enter Company name",
    options: [
      "Google",
      "Microsoft",
      "Meta",
      "Netflix",
      "Adobe",
      "Facebook",
      "Amazon",
      "Apple",
      "Spotify",
    ],
    leftSection: IconBriefcase,
  },
  {
    label: "Location",
    placeholder: "Enter job location",
    options: [
      "Delhi",
      "New York",
      "San Francisco",
      "London",
      "Berlin",
      "Tokyo",
      "Sydney",
      "Toronto",
    ],
    leftSection: IconMapPin,
  },
];

export default fields;