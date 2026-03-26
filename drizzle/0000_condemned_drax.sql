CREATE TABLE "swift_puzzles" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"word" varchar(5) NOT NULL,
	"active_date" timestamp NOT NULL,
	CONSTRAINT "swift_puzzles_active_date_unique" UNIQUE("active_date")
);
