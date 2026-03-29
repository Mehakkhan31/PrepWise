"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Lightbulb, WebcamIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import Link from "next/link";
import { useContext } from 'react';
import { WebCamContext } from "../../layout";

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  // const [webCamEnabled, setWebCamEnebled] = useState(false);
  useEffect(() => {
    console.log(params.interviewId);
    GetInterviewDetails();
  }, []);
  
  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
      
    setInterviewData(result[0]);
  };
  return (
    <div className="my-8 sm:my-10">
      <h2 className="text-center text-2xl font-bold sm:text-3xl">Let's Get Started</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col gap-5">
          <div className="panel-surface flex flex-col gap-4 rounded-[1.5rem] p-5">
            <h2 className="text-base sm:text-lg">
              <strong>Job Role/Job Position: </strong>
              {interviewData?.jobPosition}
            </h2>
            <h2 className="text-base sm:text-lg">
              <strong>Job Description/Job Stack: </strong>
              {interviewData?.jobDesc}
            </h2>
            <h2 className="text-base sm:text-lg">
              <strong>Years of Experience: </strong>
              {interviewData?.jobExperience}
            </h2>
          </div>
          <div className="rounded-[1.5rem] border border-yellow-300 bg-yellow-100 p-5 dark:border-yellow-500/20 dark:bg-yellow-500/10">
            <h2 className="flex gap-2 items-center text-yellow-700 mb-2">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-sm leading-7 text-yellow-700 dark:text-yellow-200">
              {process.env.NEXT_PUBLIC_INFORMATION}
            </h2>
          </div>
        </div>
        <div>
          {webCamEnabled ? (
            <div className="flex items-center justify-center rounded-[1.5rem] border bg-black p-4 sm:p-6">
              <Webcam
                onUserMedia={() => setWebCamEnabled(true)}
                onUserMediaError={() => setWebCamEnabled(false)}
                className="h-auto w-full max-w-[320px] rounded-xl"
                mirrored={true}
              />
            </div>
          ) : (
            <div>
              <WebcamIcon className="my-4 h-56 w-full rounded-[1.5rem] border bg-secondary p-12 sm:my-6 sm:h-72 sm:p-20" />
            </div>
          )}
          <div>
            <Button className="w-full" onClick={() => setWebCamEnabled((prev) => !prev)}>
              {webCamEnabled ? "Close WebCam" : "Enable WebCam"}
            </Button>
          </div>
        </div>
      </div>
      <div className="my-6 flex justify-center md:my-0 md:justify-end md:items-end">
        <Link href={"/dashboard/interview/" + params.interviewId + "/start"}>
          <Button className="w-full sm:w-auto">Start Interview</Button>
        </Link>
      </div>
    </div>
  );
};

export default Interview;
