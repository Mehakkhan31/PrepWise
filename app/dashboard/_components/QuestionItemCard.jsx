import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const QuestionItemCard = ({ question }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/pyq/" + question?.mockId);
  };
  return (
    <div className="panel-surface rounded-[1.5rem] p-5">
      <div className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
        Question set
      </div>
      <h2 className="text-lg font-semibold text-foreground">{question?.jobPosition}</h2>
      <h2 className="mt-2 text-sm text-muted-foreground">
        {question?.jobExperience} Years of experience
      </h2>
      <h2 className="mt-1 text-xs text-muted-foreground">Created At: {question.createdAt}</h2>

      <div className="mt-5 flex justify-between gap-5 ">
        <Button onClick={onStart} size="sm" className="w-full">
          Start
        </Button>
      </div>
    </div>
  );
};

export default QuestionItemCard;
