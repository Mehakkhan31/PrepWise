"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { chatSession } from "@/utils/GeminiAIModal";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { Question } from "@/utils/schema";
import { useRouter } from "next/navigation";

const AddQuestions = () => {
  const [openDailog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");
  const [company, setCompany] = useState("");
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [questionJsonResponse, setQuestionJsonResponse] = useState([]);
  const { user } = useUser();
  const router = useRouter();
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(
      "Data",
      jobPosition,
      jobDesc,
      typeQuestion,
      company,
      jobExperience
    );

    const InputPrompt = `
    Job Positions: ${jobPosition},
    Job Description: ${jobDesc},
    Years of Experience: ${jobExperience},
    Which type of question: ${typeQuestion},
    This company previous question: ${company},
    Based on this information, please provide 5 interview questions with answers in JSON format.
    Each question and answer should be fields in the JSON. Ensure "Question" and "Answer" are fields.
}  
  `;
    console.log("InputPrompt:", InputPrompt);

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockQuestionJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "")
        .trim();
      // console.log("Parsed data", JSON.parse(MockQuestionJsonResp));

      console.log("JSON RESPONSE", MockQuestionJsonResp);
      // console.log("Parsed RESPONSE", JSON.parse(MockQuestionJsonResp))

      if (MockQuestionJsonResp) {
        const resp = await db
          .insert(Question)
          .values({
            mockId: uuidv4(),
            MockQuestionJsonResp: MockQuestionJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            typeQuestion: typeQuestion,
            company: company,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format("YYYY-MM-DD"),
          })
          .returning({ mockId: Question.mockId });

        console.log("Inserted ID:", resp);

        if (resp) {
          setOpenDialog(false);

          router.push("/dashboard/pyq/" + resp[0]?.mockId);
        }
      } else {
        console.log("ERROR");
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error.message);
      alert("There was an error processing the data. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div
        className="panel-surface group min-h-[220px] cursor-pointer rounded-[1.75rem] p-7 transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(15,23,42,0.35)]"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex h-full flex-col justify-between">
          <div className="inline-flex w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
            Prep bank
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Create question set
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-7 text-muted-foreground">
              Build a curated question pack for company prep, technical rounds, or domain-specific interviews.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>What model questions are you seeking</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              <form onSubmit={onSubmit}>
                <div className="my-3">
                  <h2 className="text-sm leading-6 text-muted-foreground">
                    Add Details about your job position, job descritpion and
                    years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label className="text-sm font-medium text-foreground">Job Role/job Position</label>
                    <Input
                      className="mt-1"
                      value={jobPosition}
                      placeholder="Ex. Full stack Developer"
                      required
                      onChange={handleInputChange(setJobPosition)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-sm font-medium text-foreground">
                      Job Description/ Tech stack (In Short)
                    </label>
                    <Textarea
                      className="placeholder-opacity-50"
                      value={jobDesc}
                      placeholder="Ex. React, Angular, Nodejs, Mysql, Nosql, Python"
                      required
                      onChange={handleInputChange(setJobDesc)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-sm font-medium text-foreground">
                      Type of Questions (In Short)
                    </label>
                    <Input
                      className="placeholder-opacity-50"
                      value={typeQuestion}
                      placeholder="Ex. CPP, Leetcode, Domain based"
                      required
                      onChange={handleInputChange(setTypeQuestion)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-sm font-medium text-foreground">
                      Company are you seeking
                    </label>
                    <Input
                      className="mt-1"
                      value={company}
                      placeholder="Ex. Microsoft, Apple, Google, Mercedes"
                      required
                      onChange={handleInputChange(setCompany)}
                    />
                  </div>
                  <div className="my-4">
                    <label className="text-sm font-medium text-foreground">Years of Experience</label>
                    <Input
                      className="mt-1"
                      placeholder="Ex. 5"
                      value={jobExperience}
                      max="50"
                      type="number"
                      required
                      onChange={handleInputChange(setJobExperience)}
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Prep. Questions"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddQuestions;
