import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, to, ...props  }) => {
  return (
    <Route>
      {
        () => props.condition ? <Component {...props} /> : <Redirect to={to} />
      }
    </Route>
)}

export default ProtectedRoute;
