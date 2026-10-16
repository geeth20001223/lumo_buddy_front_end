export interface SurveyQuestionDefinition {
  id: string;
  db_id: number;
  question: string;
  feature_name: string;
  area: string;
  area_label: string;
  area_icon: string;
  sort_order: number;
  options: string[];
}

export const SURVEY_QUESTIONS_DATA: SurveyQuestionDefinition[] = [
  {
    id: "age_group",
    db_id: 1,
    question: "Which age group does your child belong to",
    feature_name: "Which age group does your child belong to",
    area: "demographics",
    area_label: "Demographics",
    area_icon: "👶",
    sort_order: 1,
    options: ["0-3", "4-6", "7-9", "10-12", "12 and above"],
  },
  {
    id: "sex",
    db_id: 2,
    question: "Sex of child",
    feature_name: "Sex of child",
    area: "demographics",
    area_label: "Demographics",
    area_icon: "⚧️",
    sort_order: 2,
    options: ["Male", "Female"],
  },
  {
    id: "mother_age_at_birth",
    db_id: 3,
    question: "Please what is the age of the Mother when the child was born",
    feature_name: "Please what is the age of the Mother when the child was born",
    area: "history",
    area_label: "Developmental History",
    area_icon: "🤰",
    sort_order: 3,
    options: ["below 20yrs", "20yrs - 25yrs", "26yrs - 34yrs", "above 35yrs"],
  },
  {
    id: "is_formerly_diagnosed",
    db_id: 4,
    question: "Is your child Formerly diagnosed",
    feature_name: "Is your child Formerly diagnosed",
    area: "clinical",
    area_label: "Clinical Profile",
    area_icon: "📋",
    sort_order: 4,
    options: ["Yes", "No"],
  },
  {
    id: "dsm4_diagnosis",
    db_id: 5,
    question: "If Diagnosis is yes, what was his/her diagnosis? (DSM 4 Diagnosis)",
    feature_name: "If Diagnosis is yes , what was his/her diagnosis? (DSM 4 Diagnosis)",
    area: "clinical",
    area_label: "Clinical Profile",
    area_icon: "🧠",
    sort_order: 5,
    options: [
      "Autism",
      "ADHD",
      "Aspergers",
      "PDD Nos",
      "Infection",
      "Social pragmatic Communication Disorder",
    ],
  },
  {
    id: "age_at_diagnosis",
    db_id: 6,
    question: "At what age was the child diagnosed",
    feature_name: "At what age was the child diagnosed",
    area: "history",
    area_label: "Developmental History",
    area_icon: "🎂",
    sort_order: 6,
    options: [
      "6 months",
      "1",
      "2",
      "2.5",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "16",
      "After birth",
      "At birth, now he is 5years",
      "At 1 year 2 months",
    ],
  },
  {
    id: "verbal_status",
    db_id: 7,
    question: "Is your child",
    feature_name: "Is your child ",
    area: "communication",
    area_label: "Communication",
    area_icon: "💬",
    sort_order: 7,
    options: [
      "Verbal",
      "Non- Verbal",
      "Just Few Words",
      "lots of words and phrases",
      "Very verbal",
      "VERBAL WITH MANY WORDS AND FEW PHRASES",
    ],
  },
  {
    id: "target_severity_metric",
    db_id: 8,
    question:
      "How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)",
    feature_name:
      "How can you rate your child's deficits in social communication and social interaction (This serves as the ML target severity metric)",
    area: "social",
    area_label: "Social Interaction",
    area_icon: "🤝",
    sort_order: 8,
    options: ["Mild", "Moderate", "Severe"],
  },
  {
    id: "nonverbal_behaviors",
    db_id: 9,
    question:
      "How can you rate your Childs nonverbal communicative behaviors capabilities (abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)",
    feature_name:
      "How can you rate your Childs nonverbal communicative behaviors capabilities (i.e abnormalities in eye contact, body language or deficits in understanding, use of gestures, total lack of facial expressions and nonverbal communication)",
    area: "communication",
    area_label: "Communication",
    area_icon: "👀",
    sort_order: 9,
    options: [
      "Good",
      "Fair",
      "Poor",
      "Very good",
      "he has different strengths in different areas",
    ],
  },
  {
    id: "develop_relationships",
    db_id: 10,
    question:
      "Can your Child develop, maintain and understand relationships (as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)",
    feature_name:
      "Can your Child develop, maintain and understand relationships(as in difficulties in sharing imaginative play or in making friends and absence of interest in peers.)",
    area: "social",
    area_label: "Social Relationships",
    area_icon: "🧸",
    sort_order: 10,
    options: ["Yes", "No", "Some times"],
  },
  {
    id: "motor_movements_echolalia",
    db_id: 11,
    question:
      "Do your Child has Stereotyped or repetitive motor movements and echolalia",
    feature_name:
      "Do your Child has Stereotyped or repetitive motor movements and  echolalia",
    area: "behavior",
    area_label: "Behavior Patterns",
    area_icon: "🔄",
    sort_order: 11,
    options: ["Yes", "No", "Sometimes"],
  },
  {
    id: "hyporeactivity_sensory",
    db_id: 12,
    question:
      "How is his/her Hyporeactivity to sensory aspects of the environment (i.e can he differentiate pain/temperature, respond to specific sounds or textures, do excessive smelling or touching of objects)",
    feature_name:
      "How is his/her Hyporeactivity to  sensory aspects of the environment (i.e can he differentiate pain/temperature,  respond to specific sounds or textures, do excessive smelling or touching of objects)",
    area: "sensory",
    area_label: "Sensory Processing",
    area_icon: "✨",
    sort_order: 12,
    options: ["Mild", "Moderate", "Severe"],
  },
  {
    id: "other_challenges",
    db_id: 13,
    question:
      "Please what other challenges is your childs diagnosed apart from Autism",
    feature_name:
      "Please what other challenges is your childs diagnosed apart from Autism",
    area: "clinical",
    area_label: "Clinical Profile",
    area_icon: "⚡",
    sort_order: 13,
    options: [
      "Attention deficit Hyperactivity Disorder (ADHD)",
      "Anxiety disorders",
      "Epilepsy",
      "Specific learning difficulties",
      "Speech Delay",
    ],
  },
];

export const AREA_CONFIG: Record<
  string,
  { label: string; icon: string; style: string; badgeBg: string }
> = {
  demographics: {
    label: "Demographics",
    icon: "👶",
    style: "border-sky-200 bg-sky-50 text-sky-700",
    badgeBg: "from-sky-500 to-blue-500",
  },
  clinical: {
    label: "Clinical Profile",
    icon: "🩺",
    style: "border-purple-200 bg-purple-50 text-purple-700",
    badgeBg: "from-purple-500 to-fuchsia-500",
  },
  history: {
    label: "Development History",
    icon: "📜",
    style: "border-amber-200 bg-amber-50 text-amber-700",
    badgeBg: "from-amber-500 to-orange-500",
  },
  communication: {
    label: "Communication",
    icon: "💬",
    style: "border-rose-200 bg-rose-50 text-rose-700",
    badgeBg: "from-rose-500 to-pink-500",
  },
  social: {
    label: "Social Interaction",
    icon: "🤝",
    style: "border-emerald-200 bg-emerald-50 text-emerald-700",
    badgeBg: "from-emerald-500 to-teal-500",
  },
  behavior: {
    label: "Behavioral Patterns",
    icon: "🔄",
    style: "border-indigo-200 bg-indigo-50 text-indigo-700",
    badgeBg: "from-indigo-500 to-violet-500",
  },
  sensory: {
    label: "Sensory Processing",
    icon: "✨",
    style: "border-teal-200 bg-teal-50 text-teal-700",
    badgeBg: "from-teal-500 to-cyan-500",
  },
};
