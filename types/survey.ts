export type SurveyArea =
  | "emotion"
  | "cognitive"
  | "self_awareness"
  | "mathematical"
  | "demographics"
  | "clinical"
  | "history"
  | "communication"
  | "social"
  | "behavior"
  | "sensory"
  | string;

export type SurveyQuestion = {
  id: string;
  db_id?: number;
  area: SurveyArea;
  area_label?: string;
  area_icon?: string;
  question: string;
  feature_name?: string;
  sort_order: number;
  is_active: boolean;
  options: string[];
};

export type SurveyAnswerOption = {
  label: string;
  value?: string;
  score: number;
};

export type SurveyAnswers = Record<string, string | number>;

export type SurveyScores = {
  emotion_score: number;
  cognitive_score: number;
  self_awareness_score: number;
  math_score: number;
  total_score: number;
};

export type AssessmentResult = SurveyScores & {
  id: string;
  child_id: string;
  predicted_level: number;
  recommendation: string;
  created_at: string;
  confidence?: number | null;
  severity?: string | null;
  severity_label?: string | null;
  probabilities?: Record<string, number> | null;
  emotion_level?: number | null;
  cognitive_level?: number | null;
  self_awareness_level?: number | null;
  math_level?: number | null;
  main_support_area?: SurveyArea | null;
  strongest_area?: SurveyArea | null;
};
