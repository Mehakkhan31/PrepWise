"use client";

import { Sparkles, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PremiumButtonExamples() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Start Interview</Button>
      <Button variant="outline">Save Draft</Button>
      <Button variant="secondary">Review Later</Button>
      <Button variant="ghost">Skip</Button>
      <Button variant="destructive">Discard</Button>
    </div>
  );
}

export function PremiumCardExample() {
  return (
    <Card className="gradient-border max-w-xl">
      <CardHeader>
        <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-primary">
          <Sparkles className="h-3.5 w-3.5" />
          AI Session
        </div>
        <CardTitle>Premium Interview Workspace</CardTitle>
        <CardDescription>
          Calm surfaces, focused typography, and subtle AI accents built for
          longer mock interview sessions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 text-sm text-content-secondary sm:grid-cols-3">
          <div className="rounded-2xl border border-border/35 bg-surface-secondary/65 p-4">
            <div className="text-content-primary">12</div>
            <div>Questions prepared</div>
          </div>
          <div className="rounded-2xl border border-border/35 bg-surface-secondary/65 p-4">
            <div className="text-content-primary">92%</div>
            <div>Focus score</div>
          </div>
          <div className="rounded-2xl border border-border/35 bg-surface-secondary/65 p-4">
            <div className="text-content-primary">4.8</div>
            <div>Session rating</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function PremiumInputExample() {
  return (
    <div className="max-w-xl space-y-4">
      <Input placeholder="Machine Learning Engineer" />
      <Textarea placeholder="Describe the role, stack, focus areas, and seniority." />
    </div>
  );
}

export function InterviewChatUiBlock() {
  return (
    <section className="interview-chat-block max-w-2xl">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">
            <WandSparkles className="h-3.5 w-3.5" />
            Live AI Feedback
          </div>
          <h3 className="text-xl font-semibold text-content-primary">
            Tell me about a time you improved the performance of a production
            system.
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-content-secondary">
            Focus on the bottleneck you identified, the tradeoffs you considered,
            and the measurable result after rollout.
          </p>
        </div>
        <div className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-3 py-1 text-xs font-medium text-brand-primary">
          Question 03
        </div>
      </div>

      <div className="relative z-10 mt-6 grid gap-4 md:grid-cols-[1.25fr_0.9fr]">
        <div className="rounded-[24px] border border-border/35 bg-surface-primary/55 p-5 shadow-soft backdrop-blur-md">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-content-secondary">
            Candidate Response
          </div>
          <p className="text-sm leading-7 text-content-primary">
            I started by profiling the slowest request path, traced the bottleneck
            to repeated database joins, and reduced response time by introducing a
            cache layer with careful invalidation rules.
          </p>
        </div>

        <div className="rounded-[24px] border border-brand-violet/20 bg-[linear-gradient(180deg,rgba(99,102,241,0.10),rgba(34,211,238,0.06))] p-5 shadow-glow backdrop-blur-md">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-violet">
            AI Insight
          </div>
          <p className="text-sm leading-7 text-content-primary">
            Strong structure and impact. Add one sentence about the tradeoff
            between freshness and latency to make the answer feel more senior.
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-secondary/80">
            <div className="h-full w-[82%] rounded-full bg-[image:var(--gradient-primary)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
