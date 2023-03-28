export type Question = {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
};

export type QuizData = {
  city: string;
  questions: Question[];
};
