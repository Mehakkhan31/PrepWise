import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };
  return (
    mockInterviewQuestion && (
      <div className="my-1 flex flex-col justify-between rounded-[1.5rem] border bg-secondary p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {mockInterviewQuestion &&
            mockInterviewQuestion.map((question, index) => (
              <h2
                key={index}
                className={`p-2  rounded-full text-center text-xs md:text-sm cursor-pointer md:block hidden ${
                  activeQuestionIndex == index
                    ? "bg-black text-white"
                    : "bg-secondary"
                }`}
              >
                Question #{index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-base leading-7 md:text-lg">
          {mockInterviewQuestion[activeQuestionIndex]?.Question}
        </h2>
        <Volume2
          className="cursor-pointer"
          onClick={() =>
            textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.Question)
          }
        />
        <div className="mt-6 rounded-[1.25rem] border bg-blue-100 p-4 sm:p-5 md:block hidden dark:border-blue-500/20 dark:bg-blue-500/10">
          <h2 className="flex gap-2 items-center text-blue-800">
            <Lightbulb />
            <strong>Note:</strong>
          </h2>
          <h2 className="my-2 text-sm leading-6 text-blue-700 dark:text-blue-200">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  );
};

export default QuestionSection;
