import "dotenv/config";
import mongoose from "mongoose";
import Task from "../models/Task.js";

const tasks = [
  // Phase 0 — Setup
  { phaseId: "p0", module: "Project Scaffold", title: "Init Node.js modular monolith (Express + folder structure)", dev: "Akid", type: "BE", order: 1 },
  { phaseId: "p0", module: "Project Scaffold", title: "Init React Native project (Expo), folder structure, navigation setup", dev: "Emon", type: "FE", order: 2 },
  { phaseId: "p0", module: "Project Scaffold", title: "PostgreSQL setup + JSONB schema design (users, questions, exams, results)", dev: "Akid", type: "BE", order: 3 },
  { phaseId: "p0", module: "Project Scaffold", title: "Redis setup (OTP sessions, token blacklist)", dev: "Akid", type: "BE", order: 4 },
  { phaseId: "p0", module: "Project Scaffold", title: "Cloudflare R2 / S3 bucket setup for question images", dev: "Akid", type: "BE", order: 5 },
  { phaseId: "p0", module: "Project Scaffold", title: "Design system: colors, typography, component primitives in RN", dev: "Emon", type: "FE", order: 6 },
  { phaseId: "p0", module: "Project Scaffold", title: "Environment configs (.env, dev/prod), ESLint, Prettier", dev: "Akid", type: "BE", order: 7 },

  // Phase 1 — Auth
  { phaseId: "p1", module: "Auth Module", title: "Phone number input + OTP send API (SMS gateway integration)", dev: "Akid", type: "BE", order: 1 },
  { phaseId: "p1", module: "Auth Module", title: "OTP verify + JWT access/refresh token issuance", dev: "Akid", type: "BE", order: 2 },
  { phaseId: "p1", module: "Auth Module", title: "Auth middleware (protect routes)", dev: "Akid", type: "BE", order: 3 },
  { phaseId: "p1", module: "Auth Module", title: "Phone input screen UI", dev: "Emon", type: "FE", order: 4 },
  { phaseId: "p1", module: "Auth Module", title: "OTP entry screen UI (auto-submit, countdown resend)", dev: "Emon", type: "FE", order: 5 },
  { phaseId: "p1", module: "Auth Module", title: "Token storage (secure store), auto-login on launch", dev: "Emon", type: "FE", order: 6 },
  { phaseId: "p1", module: "Auth Module", title: "Class selection screen (9 or 10) — post login onboarding", dev: "Emon", type: "FE", order: 7 },
  { phaseId: "p1", module: "Auth Module", title: "Save user class to DB, return in JWT payload", dev: "Akid", type: "BE", order: 8 },

  // Phase 2 — Content
  { phaseId: "p2", module: "Content Module", title: "DB schema: subjects, chapters, questions (JSONB for options/images)", dev: "Akid", type: "BE", order: 1 },
  { phaseId: "p2", module: "Content Module", title: "Admin: question upload API (text + image support, S3 upload)", dev: "Akid", type: "BE", order: 2 },
  { phaseId: "p2", module: "Content Module", title: "GET /subjects by class (GM, HM)", dev: "Akid", type: "BE", order: 3 },
  { phaseId: "p2", module: "Content Module", title: "GET /chapters by subject + class", dev: "Akid", type: "BE", order: 4 },
  { phaseId: "p2", module: "Content Module", title: "GET /questions (filter: chapter, difficulty, type, limit)", dev: "Akid", type: "BE", order: 5 },
  { phaseId: "p2", module: "Content Module", title: "Home screen UI (subject cards: GM, HM)", dev: "Emon", type: "FE", order: 6 },
  { phaseId: "p2", module: "Content Module", title: "Chapter list screen UI (chapter grid/list)", dev: "Emon", type: "FE", order: 7 },
  { phaseId: "p2", module: "Content Module", title: "Bookmark/Star question — API (save to user_bookmarks table)", dev: "Akid", type: "BE", order: 8 },
  { phaseId: "p2", module: "Content Module", title: "Bookmark list screen UI + bookmark toggle on question card", dev: "Emon", type: "FE", order: 9 },

  // Phase 3 — Exam Engine
  { phaseId: "p3", module: "Exam Config", title: "Exam config screen UI (chapter multi-select, type, count, difficulty, time)", dev: "Emon", type: "FE", order: 1 },
  { phaseId: "p3", module: "Exam Config", title: "POST /exam/create — build question set server-side, return session", dev: "Akid", type: "BE", order: 2 },
  { phaseId: "p3", module: "Exam Config", title: "Randomize + filter questions by difficulty/type/chapter (DB query)", dev: "Akid", type: "BE", order: 3 },
  { phaseId: "p3", module: "Exam Session", title: "Exam screen UI — question display (text + image support)", dev: "Emon", type: "FE", order: 4 },
  { phaseId: "p3", module: "Exam Session", title: "Option selection, navigation (prev/next), question palette", dev: "Emon", type: "FE", order: 5 },
  { phaseId: "p3", module: "Exam Session", title: "Countdown timer (per-exam), auto-submit on timeout", dev: "Emon", type: "FE", order: 6 },
  { phaseId: "p3", module: "Exam Session", title: "Mark for review / important flag during exam", dev: "Emon", type: "FE", order: 7 },
  { phaseId: "p3", module: "Exam Session", title: "POST /exam/submit — receive answers, calculate score server-side", dev: "Akid", type: "BE", order: 8 },
  { phaseId: "p3", module: "Exam Session", title: "Store exam result (score, per-question: correct/wrong/skipped)", dev: "Akid", type: "BE", order: 9 },

  // Phase 4 — Result & Report
  { phaseId: "p4", module: "Result Module", title: "GET /result/:examId — fetch full result with answer breakdown", dev: "Akid", type: "BE", order: 1 },
  { phaseId: "p4", module: "Result Module", title: "Result screen UI (score summary, correct/wrong/skipped counts)", dev: "Emon", type: "FE", order: 2 },
  { phaseId: "p4", module: "Result Module", title: "Mistake review screen — wrong answers with correct answer + explanation", dev: "Emon", type: "FE", order: 3 },
  { phaseId: "p4", module: "Result Module", title: "Explanation API — attach explanation text/image per question (JSONB)", dev: "Akid", type: "BE", order: 4 },
  { phaseId: "p4", module: "Report / Feedback Sheet", title: "GET /report/:examId — structured data (chapter-wise breakdown, weak areas)", dev: "Akid", type: "BE", order: 5 },
  { phaseId: "p4", module: "Report / Feedback Sheet", title: "Report screen UI (chapter performance, difficulty breakdown)", dev: "Emon", type: "FE", order: 6 },
  { phaseId: "p4", module: "Report / Feedback Sheet", title: "PDF/Slide generation — feedback sheet server-side (puppeteer or pdfkit)", dev: "Akid", type: "BE", order: 7 },
  { phaseId: "p4", module: "Report / Feedback Sheet", title: "Download report button in app (fetch PDF URL, open/share)", dev: "Emon", type: "FE", order: 8 },

  // Phase 5 — Polish & Beta
  { phaseId: "p5", module: "Beta Prep", title: "End-to-end testing: full exam flow (create → submit → result → report)", dev: "Akid", type: "BE", order: 1 },
  { phaseId: "p5", module: "Beta Prep", title: "UI bug fixes, loading states, error handling across all screens", dev: "Emon", type: "FE", order: 2 },
  { phaseId: "p5", module: "Beta Prep", title: "Rate limiting, input validation, API error responses", dev: "Akid", type: "BE", order: 3 },
  { phaseId: "p5", module: "Beta Prep", title: "Deploy backend (Railway / Render), set up DB + Redis in cloud", dev: "Akid", type: "BE", order: 4 },
  { phaseId: "p5", module: "Beta Prep", title: "Expo build — internal test distribution (TestFlight / Firebase App Dist)", dev: "Emon", type: "FE", order: 5 },
  { phaseId: "p5", module: "Beta Prep", title: "Seed real question data (9-10, GM/HM, all chapters)", dev: "Akid", type: "BOTH", order: 6 },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");

  await Task.deleteMany({});
  console.log("Cleared existing tasks.");

  await Task.insertMany(tasks.map(t => ({ ...t, done: false, tags: [] })));
  console.log(`Seeded ${tasks.length} tasks.`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
