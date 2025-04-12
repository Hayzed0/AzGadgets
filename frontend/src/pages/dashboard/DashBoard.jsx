import React from "react";
import { Link, Outlet } from "react-router";
import ViewAllOrders from "./orders/ViewAllOrders";
import DashBoardNav from "./DashBoardNav";

const DashBoard = () => {
  return (
    <div>
      <DashBoardNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashBoard;
