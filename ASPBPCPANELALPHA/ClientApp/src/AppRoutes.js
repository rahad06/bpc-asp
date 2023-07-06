import { Home } from "./components/Home";
import NewCompany from "./components/Companies/NewCompany";
import NewClient from "./components/Clients/NewClient";
import MeetingsTable from "./components/Meetings/MeetingsTable";
import ClientsTable from "./components/Clients/ClientsTable";

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
    element: <ClientsTable />
  },
  {
    path: '/newClient',
    element: <NewClient />
  },
  {
    path: '/newClient/:id', // Add the route for /editclient/[id]
    element: <NewClient />
  },
  {
    path: '/companies',
    element: <NewCompany />
  }
];

export default AppRoutes;
