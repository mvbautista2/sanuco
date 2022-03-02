import Dashboard from "views/Dashboard.js";
import File from "views/File.js";
import UserProfile from "views/UserProfile.js";
import UserRecord from "views/UserRecord";
import Messages from "views/Messages";
import Recipes from "views/Recipes";

var routesNutricionista = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/file",
    name: "Exámenes",
    rtlName: "الرموز",
    icon: "tim-icons icon-attach-87",
    component: File,
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
];
export default routesNutricionista;
