import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import NewMeeting from "./components/Meetings/NewMeeting";

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
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default AppRoutes;
