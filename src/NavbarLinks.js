import {
  faDumbbell,
  faHome,
  faRunning,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const SidebarLinks = [
  {
    name: "Home",
    route: "/dashboard",
    icon: faHome,
  },
  {
    name: "Profile",
    route: "/profile",
    icon: faUser,
  },
  {
    name: "Find",
    route: "/find",
    icon: faSearch,
  },
  {
    name: "Workout",
    route: "/workout",
    icon: faDumbbell,
  },
  {
    name: "Exercise",
    route: "/exercise",
    icon: faRunning,
  },
];

export default SidebarLinks;
