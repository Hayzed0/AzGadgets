import React from "react";

const DashBoardHome = () => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-6 w-full md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 w-full space-y-4">
          <div className="flex w-full">
            <h1>Total Orders</h1>
          </div>
          <div className="flex flex-col w-full space-y-2 items-center">
            <h1 className="text-3xl font-sans font-medium">12,000</h1>
            <p className="text-xs text-green-500">3% increase</p>
            <p className="text-xs">In past 30 days</p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 w-full space-y-4">
          <div className="flex w-full">
            <h1>Total sales</h1>
          </div>
          <div className="flex flex-col w-full space-y-2 items-center">
            <h1 className="text-3xl font-sans font-medium">$18,500</h1>
            <p className="text-xs text-green-500">22% increase</p>
            <p className="text-xs">In past 30 days</p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 w-full space-y-4">
          <div className="flex w-full">
            <h1>Total Users</h1>
          </div>
          <div className="flex flex-col w-full space-y-2 items-center">
            <h1 className="text-3xl font-sans font-medium">12</h1>
            <p className="text-xs text-green-500">6% increase</p>
            <p className="text-xs">In past 30 days</p>
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-gray-100 p-4 w-full space-y-4">
          <div className="flex w-full">
            <h1>Total Visits</h1>
          </div>
          <div className="flex flex-col w-full space-y-2 items-center">
            <h1 className="text-3xl font-sans font-medium">100</h1>
            <p className="text-xs text-green-500">13% increase</p>
            <p className="text-xs">In past 30 days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
