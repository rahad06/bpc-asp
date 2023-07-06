import { Home } from "./components/Home";
import NewCompany from "./components/Companies/NewCompany";
import NewClient from "./components/Clients/NewClient";
import MeetingsTable from "./components/Meetings/MeetingsTable";
import ClientsTable from "./components/Clients/ClientsTable";
import NewIndustry from "./components/Industries/NewIndustry";
import IndustriesTable from "./components/Industries/IndustriesTable";
import CompaniesTable from "./components/Companies/CompaniesTable";

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
    path: '/industries',
    element: <IndustriesTable />
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
    path: '/newIndustry',
    element: <NewIndustry />
  },
  {
    path: '/newIndustry/:id', // Add the route for /editclient/[id]
    element: <NewIndustry />
  },
  {
    path: '/companies',
    element: <CompaniesTable />
  },
  {
    path: '/newCompany',
    element: <NewCompany />
  },
  {
    path: '/newCompany/:id', // Add the route for /editclient/[id]
    element: <NewCompany />
  },
];

export default AppRoutes;
