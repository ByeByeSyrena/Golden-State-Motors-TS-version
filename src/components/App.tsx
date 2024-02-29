import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./NotFound/NotFound";
import SharedLayout from "./SharedLayout/SharedLayout";

const WelcomePage = lazy(() => import("../pages/WelcomePage/WelcomePage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const FavoritePage = lazy(() => import("../pages/FavoritePage/FavoritePage"));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Navigate to="home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="welcome" element={<WelcomePage />} />
        <Route path="favorites" element={<FavoritePage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
