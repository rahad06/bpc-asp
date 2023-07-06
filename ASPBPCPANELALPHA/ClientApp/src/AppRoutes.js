import { Home } from "./components/Home";
import NewCompany from "./components/Companies/NewCompany";
import NewClient from "./components/Clients/NewClient";
import MeetingsTable from "./components/Meetings/MeetingsTable";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/meetings',
    element: <MeetingsTable />
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
