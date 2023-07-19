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
import Logout from "./components/Login/Logout";
import SignUpForm from "./components/Login/SignUpForm";
import Login from "./components/Login";

const LimitedRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/industries',
        element: <IndustriesTable />
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
        path: '/newCompany/:id', // Add the route for /editclient/[id]
        element: <NewCompany />
    },
    {
        path: '/import',
        element: <Import />
    },
    {
        path: '/logout',
        element: <Logout />
    },
];

export default LimitedRoutes;
