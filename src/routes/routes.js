import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { privateRoutesArr } from "./private-routes";
import { publicRoutesArr } from "./public-routes";
import { useToken } from "../hooks/useToken";
import ScrollToTop from "../components/ScrollTop/ScrollToTop";

const Routers = () => {
  const [access, setAccess] = useState(
    JSON.parse(localStorage.getItem("access"))
  );

  const { token } = useToken();

  useEffect(() => {
    // const access = JSON.parse(localStorage.getItem("access"));
    setAccess(JSON.parse(localStorage.getItem("access")));
    console.log("the token has changed:", access);
  }, [token]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        {access && access.token ? (
          <Routes>
            {privateRoutesArr.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        ) : (
          <Routes>
            {publicRoutesArr.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        )}
      </BrowserRouter>
    </>
  );
};

export default Routers;
