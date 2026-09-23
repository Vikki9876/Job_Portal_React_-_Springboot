import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PublicRouteProps {
  children: JSX.Element; 
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const token = useSelector((state: any) => state.jwt);

    if (token) {
        return <Navigate to="/" />;
    } 
return <>{children}</>;
}

export default PublicRoute;