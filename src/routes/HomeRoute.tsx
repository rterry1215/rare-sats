import path from "@/constants/path";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Tools from "@/pages/Tools";
const HomeRoutes = [
  {
    path: path.HOME,
    element: <Home />,
  },
  {
    path: path.PROFILE,
    element: <Profile />,
  },
  {
    path: path.TOOLS,
    element: <Tools />,
  },
];

export default HomeRoutes;
