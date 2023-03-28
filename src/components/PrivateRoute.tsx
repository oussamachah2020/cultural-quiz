import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../context/User";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  exact?: boolean;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  exact,
  path,
}: PrivateRouteProps) => {
  const { user, isLoadingUser } = useUser();

  if (isLoadingUser) {
    return <div>Loading user...</div>;
  }
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <Route exact={exact || false} component={component} path={path}></Route>
  );
};

export default PrivateRoute;
