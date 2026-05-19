export type Difficulty = "easy" | "medium" | "hard";

export type Door = {
  readonly id: number;
  readonly difficulty: Difficulty;
  readonly cost: number;
  isUnlocked: boolean;
};

export type Riddle = {
  readonly id: number;
  readonly difficulty: Difficulty;
  readonly question: string;
  readonly answer?: string;
  readonly hint: string;
};
