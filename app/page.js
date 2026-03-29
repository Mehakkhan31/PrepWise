"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Menu,
  ShieldCheck,
  Sparkles,
  Target,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import Contect from "./_components/Contect";

const features = [
  {
    icon: Target,
    title: "Targeted interview sets",
    copy: "Generate role-specific questions based on experience, stack, and the type of interview you want to practice.",
  },
  {
    icon: Sparkles,
    title: "Instant AI feedback",
    copy: "Review how each answer landed, where it was weak, and how to make it clearer and more confident.",
  },
  {
    icon: ShieldCheck,
    title: "Focused practice flow",
    copy: "A calmer interface designed for repeat sessions, with better readability and less visual noise.",
  },
];

const testimonials = [
  {
    quote:
      "The app helped me structure my answers better. It felt more like a real prep workspace than a flashy demo.",
    author: "Aman Verma",
  },
  {
    quote:
      "The feedback loop made it easy to spot weak answers quickly and improve them before my interviews.",
    author: "Sarah Williams",
  },
];

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <Head>
        <title>PrepWise</title>
        <meta
          name="description"
          content="PrepWise helps you practice interviews with AI-guided mock sessions and feedback."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="hero-orb left-[-6rem] top-24 h-56 w-56 bg-indigo-400/20" />
      <div className="hero-orb right-[-4rem] top-16 h-64 w-64 bg-sky-400/20" />

      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
          <div className="app-shell flex items-center justify-between gap-4 py-4">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground"
            >
              PrepWise
            </Link>

            <nav className="hidden items-center justify-center gap-2 text-sm md:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ModeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex items-center justify-center rounded-xl border border-border bg-background p-2 text-muted-foreground hover:bg-secondary hover:text-foreground md:hidden"
                aria-label="Toggle navigation menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="border-t border-border/70 bg-background md:hidden">
              <div className="app-shell flex flex-col gap-2 py-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground"
                >
                  Start Practicing
                </Link>
              </div>
            </div>
          )}
        </header>

        <section className="app-shell py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm dark:border-indigo-500/20 dark:bg-slate-900/80 dark:text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                Interview prep that feels clear and professional
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                Practice interviews in a workspace that feels serious, clean,
                and actually usable.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Generate mock interviews, answer questions out loud, and review
                feedback in a product designed for focus instead of gimmicks.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/dashboard">
                    Start Practicing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#features">See how it works</a>
                </Button>
              </div>
            </div>

            <div className="glass-surface rounded-[2rem] p-4 sm:p-6 sm:p-8">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/90 p-4 sm:p-6 dark:bg-slate-950/50">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Frontend Engineer Mock
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      5 questions generated for a React + Node.js role
                    </p>
                  </div>
                  <div className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    Live session
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-secondary p-4 dark:bg-secondary/70">
                    <p className="text-sm font-medium text-foreground">
                      Question 03
                    </p>
                    <p className="mt-2 text-base leading-7 text-foreground">
                      Explain a time you improved the performance of a production
                      application and how you measured the result.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-indigo-100 bg-white p-4 shadow-sm dark:border-indigo-500/15 dark:bg-slate-900/70">
                    <p className="text-sm font-medium text-foreground">
                      AI feedback
                    </p>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      Good structure and impact. Add more detail about tradeoffs
                      and how you validated the improvement after rollout.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="app-shell py-8 sm:py-12">
          <div className="mb-10 max-w-2xl">
            <h2 className="section-title">
              Built for repeated interview practice, not one-time visual flair.
            </h2>
            <p className="section-copy mt-4">
              The product should feel calm, credible, and efficient. These are
              the parts that matter most when you use it regularly.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="panel-surface rounded-[1.75rem] p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="app-shell py-12 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.author}
                className="panel-surface rounded-[1.75rem] p-6 sm:p-7"
              >
                <p className="text-base leading-8 text-foreground">
                  "{item.quote}"
                </p>
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {item.author}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="app-shell py-12 sm:py-16">
          <div className="panel-surface rounded-[2rem] p-4 sm:p-6 sm:p-8">
            <Contect />
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t border-border/70 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 PrepWise. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Page;
