import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import UserProfile from "views/UserProfile.js";
import UserRecord from "views/UserRecord";
import Messages from "views/Messages";
import Notifications from "views/Notifications";
import Training from "views/Training";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Exámenes",
    rtlName: "الرموز",
    icon: "tim-icons icon-attach-87",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "Perfil de usuario",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/messages",
    name: "MENSAJES",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-email-85",
    component: Messages,
    layout: "/admin",
  },
  {
    path: "/record",
    name: "ANTECEDENTES",
    rtlName: "ار تي ال",
    icon: "tim-icons icon-notes",
    component: UserRecord,
    layout: "/admin",
  },
  {
    path: "/recipes",
    name: "RECETAS",
    icon: "tim-icons icon-book-bookmark",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/training",
    name: "ENTRENAMIENTO",
    icon: "tim-icons icon-user-run",
    component: Training,
    layout: "/admin",
  },
  {
    path: "/recipes",
    component: Notifications,
    layout: "/admin",
  },
];
export default routes;
