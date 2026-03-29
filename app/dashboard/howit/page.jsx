import Head from "next/head";
import { ArrowRight, Brain, FileText, Mic, MessageSquareText } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Set up your interview",
    description:
      "Choose a role, add your tech stack or job description, and define your experience level so the questions feel relevant.",
  },
  {
    icon: Brain,
    title: "Generate AI questions",
    description:
      "The app creates a tailored mock interview with role-specific questions and model answers for guided practice.",
  },
  {
    icon: Mic,
    title: "Answer out loud",
    description:
      "Start the interview session, record your responses, and practice speaking clearly under realistic timing.",
  },
  {
    icon: MessageSquareText,
    title: "Review feedback",
    description:
      "See ratings, compare your response with the expected answer, and identify where to improve next.",
  },
];

const HowItWorks = () => {
  return (
    <>
      <Head>
        <title>How It Works - PrepWise</title>
        <meta
          name="description"
          content="Learn how PrepWise works."
        />
      </Head>

      <main className="app-shell py-10">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            How it works
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            A simple workflow designed for repeated interview practice.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            The product is meant to help you prepare faster: generate a mock interview,
            answer questions naturally, and review where your responses need work.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="grid gap-5 sm:grid-cols-2">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="panel-surface rounded-[1.75rem] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold">{step.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </section>

          <section className="panel-surface rounded-[2rem] p-7 sm:p-8">
            <h2 className="text-xl font-semibold">Practice flow</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              A good session usually follows the same rhythm every time, which
              makes your prep more consistent and easier to repeat.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-2xl bg-secondary/70 p-4 dark:bg-secondary/45">
                <p className="text-sm font-medium text-foreground">Create a session</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Start with one target role or company so the questions stay focused.
                </p>
              </div>

              <div className="flex items-center justify-center py-1 text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="rounded-2xl bg-secondary/70 p-4 dark:bg-secondary/45">
                <p className="text-sm font-medium text-foreground">Answer naturally</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Record clear responses as if you were speaking to a real interviewer.
                </p>
              </div>

              <div className="flex items-center justify-center py-1 text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
              </div>

              <div className="rounded-2xl bg-secondary/70 p-4 dark:bg-secondary/45">
                <p className="text-sm font-medium text-foreground">Improve from feedback</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Review weak areas, refine your wording, and repeat until your answers feel sharp.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;
