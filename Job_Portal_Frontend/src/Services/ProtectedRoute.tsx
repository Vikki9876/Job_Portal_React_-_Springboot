import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

interface ProtectedRouteProps {
  children: JSX.Element; // Or React.ReactNode
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const token = useSelector((state: any) => state.jwt);

    if (!token || token.trim() === "") {
        return <Navigate to="/login" replace />;
    }

      //  const decoded: any = jwtDecode(token);
       // console.log(decoded);
      //  if (allowedRoles && !allowedRoles.includes(decoded.applicantType)) {
    //        return <Navigate to="/unauthorised" />;
    
   //         return <Navigate to="/login" />;
   // }

    return <>{children}</>;
};

export default ProtectedRoute;