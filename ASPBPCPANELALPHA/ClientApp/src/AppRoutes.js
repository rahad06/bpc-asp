import { Home } from "./components/Home";
import NewCompany from "./components/Companies/NewCompany";
import NewClient from "./components/Clients/NewClient";
import MeetingsTable from "./components/Meetings/MeetingsTable";
import ClientsTable from "./components/Clients/ClientsTable";
import NewIndustry from "./components/Industries/NewIndustry";
import IndustriesTable from "./components/Industries/IndustriesTable";
import CompaniesTable from "./components/Companies/CompaniesTable";
import NewMeeting from "./components/Meetings/NewMeeting";
import ClientMeetings from "./components/Meetings/ClientMeetings";
import Import from "./components/Import";
import InterpretersTable from "./components/Interpreters/InterpretersTable";
import NewInterpreter from "./components/Interpreters/NewInterpreter";
import CompanyMeetings from "./components/Companies/CompanyMeetings";

const AppRoutes = [
  {
    index: true,
    path: "/",
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
    path: '/interpreters',
    element: <InterpretersTable />
  },
  {
    path: '/newInterpreter',
    element: <NewInterpreter />
  },
  {
    path: '/newInterpreter/:id',
    element: <NewInterpreter />
  },
  {
    path: '/newCompany/:id', // Add the route for /editclient/[id]
    element: <NewCompany />
  },
  {
    path: '/import',
    element: <Import />
  },
  {
    path: '/newMeeting',
    element: <NewMeeting />
  },
  {
    path: '/newMeeting/:id', // Add the route for /editclient/[id]
    element: <NewMeeting />
  },
  {
    path: '/clientMeetings/:id', // Add the route for /editclient/[id]
    element: <ClientMeetings />
  },
  {
    path: '/companyMeetings/:id', // Add the route for /editclient/[id]
    element: <CompanyMeetings />
  },
];

export default AppRoutes;
