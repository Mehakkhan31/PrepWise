import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddQuestions from "../_components/AddQuestions";
import QuestionList from "../_components/QuestionList";

const Questions = () => {
  return (
    <div className="app-shell py-10">
      <div className="mb-8 max-w-2xl">
        <h2 className="text-3xl font-semibold tracking-tight">Master Your Interviews</h2>
        <h2 className="mt-2 text-base leading-7 text-muted-foreground">
          Create focused question banks for company prep, technical rounds, and repeat practice.
        </h2>
      </div>

      <div className="my-5 grid grid-cols-1 md:grid-cols-3">
        <AddQuestions/>
      </div>

      <QuestionList/>
    </div>
  );
};

export default Questions;
