# PrepWise

PrepWise is an AI-powered interview preparation platform built with Next.js, Clerk, Gemini, Neon PostgreSQL, and Drizzle ORM. It helps users generate mock interviews, practice answers, review AI feedback, and create reusable question banks for targeted preparation.

## Overview

PrepWise is designed for candidates who want a structured interview practice workflow rather than a simple question list. Users can:

- create a mock interview from a target role and tech stack
- answer interview questions in a guided session
- transcribe spoken responses
- receive AI-generated answer feedback and ratings
- build reusable question sets for company or domain-specific preparation
- review previous sessions and stored feedback

## Core Features

- AI-generated mock interviews based on job role, description, and experience
- AI-generated prep question banks for focused practice
- Clerk authentication for sign-in and protected dashboard routes
- interview session flow with webcam support and audio answer recording
- Gemini-based audio transcription and answer evaluation
- persistent interview history and saved feedback
- responsive dashboard, landing page, upgrade page, and how-it-works page
- light/dark theme support

## Tech Stack

### Frontend

- Next.js 14
- React 18
- Tailwind CSS
- Radix UI primitives
- Lucide icons
- Sonner for toast notifications
- next-themes for theme switching

### Authentication

- Clerk

### AI

- Google Gemini (`gemini-1.5-flash`)

### Database

- Neon PostgreSQL
- Drizzle ORM
- Drizzle Kit

### Media / Interaction

- `react-webcam`
- browser `MediaRecorder`
- browser Speech Synthesis API

## Product Flows

### 1. Mock Interview Flow

1. User enters role, stack, and experience.
2. Gemini generates a JSON interview set.
3. The interview is stored in PostgreSQL.
4. User starts the session and answers questions.
5. Audio is transcribed with Gemini.
6. Gemini evaluates the answer and returns rating + feedback.
7. Feedback is stored and shown in the final review screen.

### 2. Question Bank Flow

1. User enters role, company, experience, and question type.
2. Gemini generates a reusable question set in JSON format.
3. The result is stored in PostgreSQL.
4. User can open and review it later from the dashboard.

## Project Structure

```text
app/
  (auth)/
    sign-in/
    sign-up/
  dashboard/
    howit/
    interview/[interviewId]/
    pyq/[pyqId]/
    question/
    upgrade/
    _components/
  _components/
  layout.js
  page.js

components/
  ui/
  ModeToggle.jsx
  ThemeProvider.tsx

utils/
  db.js
  GeminiAIModal.js
  schema.js

drizzle/
  schema.ts
  relations.ts
  meta/
```

## Database Schema

The main application schema is defined in `utils/schema.js`.

### `mockInterview`

Stores generated interview sets.

- `id`
- `jsonMockResp`
- `jobPosition`
- `jobDesc`
- `jobExperience`
- `createdBy`
- `createdAt`
- `mockId`

### `question`

Stores generated prep question sets.

- `id`
- `MockQuestionJsonResp`
- `jobPosition`
- `jobDesc`
- `jobExperience`
- `typeQuestion`
- `company`
- `createdBy`
- `createdAt`
- `mockId`

### `userAnswer`

Stores interview answers and evaluation results.

- `id`
- `mockIdRef`
- `question`
- `correctAns`
- `userAns`
- `feedback`
- `rating`
- `userEmail`
- `createdAt`

### `newsletter`

Stores contact form submissions.

- `id`
- `newName`
- `newEmail`
- `newMessage`
- `createdAt`

## Environment Variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_GEMINI_API_KEY=

NEXT_PUBLIC_DRIZZLE_DB_URL=

NEXT_PUBLIC_INFORMATION=
NEXT_PUBLIC_QUESTION_NOTE=
```

### Notes

- `NEXT_PUBLIC_GEMINI_API_KEY` is used by the current frontend-driven AI flow.
- `NEXT_PUBLIC_DRIZZLE_DB_URL` is used by the current database access layer.
- `NEXT_PUBLIC_INFORMATION` and `NEXT_PUBLIC_QUESTION_NOTE` are used in the interview UI.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- Neon PostgreSQL database
- Clerk project
- Gemini API key

### Installation

1. Clone the repository:

```bash
git clone <your-repository-url>
cd PrepWise
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env.local` and add the required environment variables.

4. Push the database schema:

```bash
npm run db:push
```

5. Start the development server:

```bash
npm run dev
```

6. Open the app:

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run Next.js linting
- `npm run db:push` - push schema changes with Drizzle Kit
- `npm run db:studio` - open Drizzle Studio

## Authentication

Clerk is used for authentication. Protected routes are enforced in `middleware.js`, primarily for:

- `/dashboard`
- nested dashboard pages

Auth screens live in:

- `app/(auth)/sign-in/[[...sign-in]]/page.jsx`
- `app/(auth)/sign-up/[[...sign-up]]/page.jsx`

## UI and Theming

The application uses a custom Tailwind-based UI system with:

- reusable primitives in `components/ui`
- global design tokens in `app/globals.css`
- theme switching through `next-themes`

## Current Architecture Notes

This project currently uses a frontend-heavy architecture:

- Gemini calls are initiated from the client
- database reads/writes are performed through the shared Drizzle utility imported in the app
- interview and question content are stored as JSON text blobs

This keeps the implementation simple, but for a production-hardening pass you may want to:

- move AI calls to server actions or API routes
- move database writes behind server-side authorization
- reduce reliance on `NEXT_PUBLIC_*` for sensitive workflows
- introduce stronger validation for AI JSON responses

## Troubleshooting

### Next.js `.next` folder issues

If you see errors like:

- `Cannot find module './vendor-chunks/@clerk.js'`
- `Cannot find module './948.js'`
- missing files inside `.next/server/...`

the issue is usually a corrupted or stale `.next` cache, especially when the project is inside OneDrive.

Recommended fix:

1. stop the dev server
2. delete the `.next` folder
3. restart with `npm run dev`

If possible, keep the project outside OneDrive-synced folders to avoid repeated cache corruption.

## Deployment

To deploy:

1. configure the same environment variables in your deployment platform
2. run `npm run build`
3. run `npm run start` or deploy through a platform like Vercel

## Contributing

Contributions are welcome.

Suggested flow:

1. fork the repository
2. create a feature branch
3. make and test your changes
4. open a pull request with a clear summary

## License

Add a license file if you plan to distribute or open-source the project publicly.
