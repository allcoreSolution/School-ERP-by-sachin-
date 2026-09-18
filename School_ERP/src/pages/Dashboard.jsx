import React from 'react';
import DashboardHeader from '../components/main-dashboard/DashboardHeader';
import KPIRow from '../components/main-dashboard/KPIRow';
import RowOne from '../components/main-dashboard/RowOne';
import RowTwo from '../components/main-dashboard/RowTwo';
import RowThree from '../components/main-dashboard/RowThree';
import RowFour from '../components/main-dashboard/RowFour';
import RowFive from '../components/main-dashboard/RowFive';
import RowSix from '../components/main-dashboard/RowSix';
import RowSeven from '../components/main-dashboard/RowSeven';
import RowEight from '../components/main-dashboard/RowEight';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fc] p-4 md:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader />
        <KPIRow />
        <RowOne />
        <RowTwo />
        <RowThree />
        <RowFour />
        <RowFive />
        <RowSix />
        <RowSeven />
        <RowEight />
      </div>
    </div>
  );
};

export default Dashboard;
