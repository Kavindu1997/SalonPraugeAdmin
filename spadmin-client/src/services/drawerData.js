import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import EventIcon from "@mui/icons-material/Event";

export const DrawerData = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "Clients",
    path: "/client",
    icon: <PeopleIcon />,
  },
  {
    id: 3,
    title: "Admins",
    path: "/admin",
    icon: <AdminPanelSettingsIcon />,
  },
  {
    id: 4,
    title: "Reservation",
    path: "/reservation",
    icon: <CompareArrowsIcon />,
  },
  {
    id: 5,
    title: "Calender",
    path: "/calender",
    icon: <EventIcon />,
  },
];
