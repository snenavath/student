import { UserCircleIcon,BookOpenIcon,HomeIcon,DocumentCheckIcon } from "@heroicons/react/24/outline";


export const sidebarData = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
    className: "nav-text",
  },
  {
    name: "Students",
    path: "/students",
    icon: UserCircleIcon,
    className: "nav-text",
  },
  {
    name: "Courses",
    path: "/",
    icon: BookOpenIcon,
    className: "nav-text",
  },
  {
    name: "Results",
    path: "/",
    icon: DocumentCheckIcon,
    className: "nav-text",
  },
  
 
];


export const tableHeaders=["First Name","Last Name","Date of Birth"]


