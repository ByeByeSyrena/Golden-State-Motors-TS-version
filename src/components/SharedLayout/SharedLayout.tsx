import React from "react";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Header } from "../Header/Header";
// import { Loader } from '../Loader/Loader';
import { Footer } from "../Footer/Footer";

const SharedLayout = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SharedLayout;
