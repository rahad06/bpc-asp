import { Home } from "./components/Home";
import NewMeeting from "./components/Meetings/NewMeeting";
import NewCompany from "./components/Companies/NewCompany";
import NewClient from "./components/Clients/NewClient";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/meetings',
    element: <NewMeeting />
  },
  {
    path: '/clients',
    element: <NewClient />
  },
  {
    path: '/companies',
    element: <NewCompany />
  }
];

export default AppRoutes;
