"use client";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Volume2 } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

let currentUtterance = null;
let currentText = ""; // Track current speaking text

const textToSpeech = (text) => {
  if ("speechSynthesis" in window) {
    const synth = window.speechSynthesis;

    // If the same text is already playing, stop it
    if ((synth.speaking || synth.pending) && text === currentText) {
      synth.cancel();
      currentUtterance = null;
      currentText = "";
      return;
    }

    // Stop current speech (if different text is clicked)
    if (synth.speaking || synth.pending) {
      synth.cancel();
    }

    // Create new utterance
    const speech = new SpeechSynthesisUtterance(text);
    currentUtterance = speech;
    currentText = text;

    speech.onend = () => {
      currentUtterance = null;
      currentText = "";
    };

    synth.speak(speech);
  } else {
    alert("Sorry, your browser does not support text to speech.");
  }
};

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce(
        (sum, item) => sum + Number(item.rating),
        0
      );
      // console.log("total",totalRating);
      // console.log("length",feedbackList.length);
      return Number(totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  return (
    <div className="py-8 sm:py-10">
      {feedbackList?.length == 0 ? (
        <h2 className="my-5 text-xl font-bold text-gray-500">
          No Interview feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-green-500 sm:text-3xl">Congratulations</h2>
          <h2 className="text-2xl font-bold">
            Here is your interview feedback
          </h2>
          <h2 className="my-3 text-base text-primary sm:text-lg">
            Your overall interview rating{" "}
            <strong
              className={`${
                overallRating >= 5 ? "text-green-500" : "text-red-600"
              }`}
            >
              {Number(overallRating) === 1.0 ? 0 : overallRating}
              <span className="text-black dark:text-white">/10</span>
            </strong>
          </h2>
          <h2 className="text-sm leading-6 text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="my-2 flex w-full items-start justify-between gap-4 rounded-xl bg-secondary p-3 text-left text-sm sm:text-base">
                  <span className="pr-2">{item.question}</span>
                  <ChevronDown className="h-5 w-5 shrink-0" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="rounded-lg border p-3 text-red-500">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="rounded-lg border bg-red-50 p-3 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                      <Volume2
                        className="mt-2 cursor-pointer"
                        onClick={() => textToSpeech(item.userAns)}
                      />
                    </h2>
                    <h2 className="rounded-lg border bg-green-50 p-3 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <Volume2
                      className="cursor-pointer"
                      onClick={() => textToSpeech(item.correctAns)}
                    />
                    <h2 className="rounded-lg border bg-blue-50 p-3 text-sm text-slate-900">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                    <Volume2
                      className="cursor-pointer"
                      onClick={() => textToSpeech(item.feedback)}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}

      <Button className="mt-6 w-full sm:w-auto" onClick={() => router.replace("/dashboard")}>Go Home</Button>
    </div>
  );
};

export default Feedback;
