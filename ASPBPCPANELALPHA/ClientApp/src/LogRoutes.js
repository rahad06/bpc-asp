import Login from "./components/Login";
import SignUpForm from "./components/Login/SignUpForm";
import Logout from "./components/Login/Logout";
import LoginForm from "./components/Login/LoginForm";


const LogRoutes = [
    {
        index: true,
        element: <LoginForm />
    },
    {
        path: '/logout',
        element: <Logout />
    },
    {
        path: '/signup',
        element: <SignUpForm />
    },
    
];

export default LogRoutes;
