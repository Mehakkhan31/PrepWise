import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const mockInterview = pgTable("mockInterview", {
	id: serial("id").primaryKey().notNull(),
	jsonMockResp: text("jsonMockResp").notNull(),
	jobPosition: varchar("jobPosition").notNull(),
	jobDesc: varchar("jobDesc").notNull(),
	jobExperience: varchar("jobExperience").notNull(),
	createdBy: varchar("createdBy").notNull(),
	createdAt: varchar("createdAt"),
	mockId: varchar("mockId").notNull(),
});

export const userAnswer = pgTable("userAnswer", {
	id: serial("id").primaryKey().notNull(),
	mockId: varchar("mockId").notNull(),
	question: varchar("question").notNull(),
	correctAns: text("correctAns"),
	userAns: text("userAns"),
	feedback: text("feedback"),
	rating: varchar("rating"),
	userEmail: varchar("userEmail"),
	createdAt: varchar("createdAt"),
});

export const newsletter = pgTable("newsletter", {
	id: serial("id").primaryKey().notNull(),
	newName: varchar("newName"),
	newEmail: varchar("newEmail"),
	newMessage: text("newMessage"),
	createdAt: varchar("createdAt"),
});

export const question = pgTable("question", {
	id: serial("id").primaryKey().notNull(),
	MockQuestionJsonResp: text("MockQuestionJsonResp").notNull(),
	jobPosition: varchar("jobPosition").notNull(),
	jobDesc: varchar("jobDesc").notNull(),
	jobExperience: varchar("jobExperience").notNull(),
	typeQuestion: varchar("typeQuestion").notNull(),
	company: varchar("company").notNull(),
	createdBy: varchar("createdBy").notNull(),
	createdAt: varchar("createdAt"),
	mockId: varchar("mockId").notNull(),
});