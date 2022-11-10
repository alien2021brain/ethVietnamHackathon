import React from "react";
import { Route, Switch, BrowserRouter, HashRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import AdminDashbord from "./Admin/AdminDashbord";
import { PublicRoute, PrivateRoute, ProtectedRoute } from "./RouteComponents";
import Enroll from "./Admin/Enroll";
import Guard from "./Admin/Guard";

const Page404 = () => <h5>Page Not Found 404</h5>;
const Home = () => <h5>Home</h5>;
const FileRotes = () => {
  const [user, setLoginUser] = useState({
    id: null,
    user: {},
  });

  useEffect(() => {
    const id = localStorage.getItem("id");
    const user = localStorage.getItem("FirstName");

    // console.log(id, user);
  }, [localStorage.getItem("id")]);
  return (
    <div className="fileRoutes">
      <Switch>
        <PrivateRoute
          path="/dashboard"
          component={AdminDashbord}
        ></PrivateRoute>
        <PrivateRoute path="/enroll" component={Enroll}></PrivateRoute>
        <PrivateRoute path="/guard" component={Guard}></PrivateRoute>

        <ProtectedRoute exact path="/signup" component={Login} />
        <ProtectedRoute exact path="/" component={Login} />
        <Route path="*" component={Page404} />
      </Switch>
    </div>
  );
};

export default FileRotes;
