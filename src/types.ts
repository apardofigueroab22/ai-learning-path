export type ExperienceLevel = "newcomer" | "intermediate" | "builder";
export type Track =
  | "personal"
  | "work"
  | "builder"
  | "informed"
  | "curious";
export type Depth = "shallow" | "medium" | "deep";
export type TopicId =
  | "fundamentals"
  | "agents"
  | "automation"
  | "building"
  | "work"
  | "philosophy";

export type Video = {
  id: string;
  title: string;
  channel: string;
  youtubeId: string;
  duration: string; // human readable
  level: ExperienceLevel;
  topics: TopicId[];
  description: string;
  whyItMatters: string;
};

export type QuizAnswers = {
  experience: 0 | 1 | 2; // Q1
  agentFamiliarity: 0 | 1 | 2 | 3; // Q2
  goal: 0 | 1 | 2 | 3 | 4; // Q3
  context: 0 | 1 | 2 | 3; // Q4
  time: 0 | 1 | 2; // Q5
};

export type QuizQuestion = {
  id: keyof QuizAnswers;
  number: number;
  eyebrow: string;
  question: string;
  helper?: string;
  options: { value: number; label: string; description?: string }[];
};

export type TopicMeta = {
  id: TopicId;
  number: number;
  title: string;
  short: string;
  description: string;
};

export type Path = {
  track: Track;
  level: ExperienceLevel;
  depth: Depth;
  title: string;
  summary: string;
  videoIds: string[]; // ordered
};

export type QuizState = "intro" | "quiz" | "calculating" | "results";
