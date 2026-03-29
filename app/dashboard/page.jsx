import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";
import InterviewList from "./_components/InterviewList";

const Dashboard = () => {
  return (
    <div className="app-shell py-10">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">Dashboard</h2>
        <h2 className="mt-2 text-base leading-7 text-muted-foreground">
          Create structured mock interviews, revisit previous sessions, and keep your prep in one place.
        </h2>
      </div>

      <div className="my-5 grid grid-cols-1 md:grid-cols-3">
        <AddNewInterview/>
      </div>

      <InterviewList/>
    </div>
  );
};

export default Dashboard;
