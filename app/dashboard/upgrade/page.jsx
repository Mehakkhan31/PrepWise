"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import PricingPlan from "../_components/PricingPlan";
import { Button } from "@/components/ui/button";

const planFeatures = [
  "Unlimited mock interview creation",
  "Reusable question banks for focused prep",
  "Answer feedback and rating history",
  "Priority support for account issues",
];

const Upgrade = () => {
  const { user } = useUser();

  return (
    <div className="app-shell py-10">
      <div className="mb-10 max-w-3xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
          <Sparkles className="h-3.5 w-3.5" />
          Upgrade
        </div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Choose a plan that supports consistent interview practice.
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
          Keep your preparation structured with faster feedback loops, saved sessions,
          and a workspace designed for repeat use.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="panel-surface rounded-[2rem] p-7 sm:p-8">
          <h2 className="text-xl font-semibold">Why upgrade</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            The paid plans are positioned for serious prep sessions where you want
            repeated practice without friction.
          </p>

          <div className="mt-8 space-y-4">
            {planFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 rounded-2xl bg-secondary/70 px-4 py-4 dark:bg-secondary/45"
              >
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/12 text-primary dark:bg-primary/20">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-sm leading-6 text-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PricingPlan.map((item, index) => {
            const isHighlighted = index === 0;

            return (
              <div
                key={index}
                className={`panel-surface relative rounded-[2rem] p-7 sm:p-8 ${
                  isHighlighted ? "border-primary/30 shadow-[0_18px_44px_-24px_rgba(79,70,229,0.4)]" : ""
                }`}
              >
                {isHighlighted && (
                  <div className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Popular
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {item.duration}
                  </p>
                  <div className="mt-4 flex items-end gap-2">
                    <span className="text-4xl font-semibold tracking-tight text-foreground">
                      ${item.price}
                    </span>
                    <span className="pb-1 text-sm text-muted-foreground">
                      / {item.duration.toLowerCase()}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    Best for candidates who want a more consistent interview prep workflow.
                  </p>
                </div>

                <div className="my-8 h-px bg-border" />

                <div className="space-y-3">
                  {planFeatures.slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm text-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="mt-8 w-full">
                  <a
                    href={`${item.link}?prefilled_email=${user?.primaryEmailAddress?.emailAddress ?? ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Started
                  </a>
                </Button>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default Upgrade;
