import React from "react";
import Sidebar from "../../components/Sidebar";
import WeeklySumup from "../../components/WeeklySumup";
import RecentExpenses from "../../components/RecentExpenses";
import UpcomingBills from "../../components/UpcomingBills";

export default function Component() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Weekly Sumup</h1>
        <div className="grid gap-6">
          <div className="lg:col-span-2">
            <WeeklySumup />
            <div className="grid grid-cols-2 gap-6">
                <RecentExpenses />
                <UpcomingBills />
            </div>
            
          </div>
          <div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
