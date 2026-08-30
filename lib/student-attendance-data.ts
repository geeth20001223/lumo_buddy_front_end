export interface StudentProfile {
  id: string;
  name: string;
  age: number;
  gender: string;
  supportLevel: 1 | 2 | 3;
  supportLevelLabel: string;
  primaryGoal: string;
  avatarColor: string;
}

export interface DailyAttendanceLog {
  id: string;
  studentId: string;
  studentName: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string; // Mon, Tue, etc.
  status: "Present" | "Missed" | "Partial";
  sessionsCount: number; // e.g. 1, 2, 3 times logged in for the day
  startTime: string; // e.g. "12:15 PM" (strictly between 12:00 PM and 4:00 PM)
  endTime: string; // e.g. "01:15 PM" (strictly ending by 5:00 PM)
  playedMinutes: number; // e.g. 45 to 60 mins total for the day
  accuracy: number; // percentage e.g. 85%
  gamesPlayed: string[];
  notes: string;
}

// 10 Students aligned with system database inspector records
export const MOCK_STUDENTS: StudentProfile[] = [
  {
    id: "c1111111-1111-4111-8111-111111111111",
    name: "Dilruk",
    age: 8,
    gender: "Male",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Unlocked Mastery",
    primaryGoal: "Advanced Pattern Matching & Speed Math",
    avatarColor: "bg-indigo-500",
  },
  {
    id: "c2222222-2222-4222-8222-222222222222",
    name: "Oneli",
    age: 7,
    gender: "Female",
    supportLevel: 2,
    supportLevelLabel: "Level 2 - Guided Growth",
    primaryGoal: "Emotion Matching & Social Understanding",
    avatarColor: "bg-purple-500",
  },
  {
    id: "c3333333-3333-4333-8333-333333333333",
    name: "Inuki",
    age: 9,
    gender: "Female",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Advanced Focus",
    primaryGoal: "Cognitive Memory & Self Awareness",
    avatarColor: "bg-fuchsia-500",
  },
  {
    id: "c4444444-4444-4444-8444-444444444444",
    name: "Yunara",
    age: 8,
    gender: "Female",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Unlocked Mastery",
    primaryGoal: "Daily Routine Order & Counting",
    avatarColor: "bg-pink-500",
  },
  {
    id: "c5555555-5555-4555-8555-555555555555",
    name: "Supuni",
    age: 10,
    gender: "Female",
    supportLevel: 2,
    supportLevelLabel: "Level 2 - Guided Growth",
    primaryGoal: "Feeling Need Choice & Emotional Balance",
    avatarColor: "bg-rose-500",
  },
  {
    id: "c6666666-6666-4666-8666-666666666666",
    name: "Anusara",
    age: 7,
    gender: "Male",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Advanced Focus",
    primaryGoal: "Situation Emotion Choice & Reasoning",
    avatarColor: "bg-sky-500",
  },
  {
    id: "c7777777-7777-4777-8777-777777777777",
    name: "Sakuni",
    age: 9,
    gender: "Female",
    supportLevel: 2,
    supportLevelLabel: "Level 2 - Guided Growth",
    primaryGoal: "Number Matching & Mathematical Logic",
    avatarColor: "bg-emerald-500",
  },
  {
    id: "c8888888-8888-4888-8888-888888888888",
    name: "Rehan",
    age: 8,
    gender: "Male",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Unlocked Mastery",
    primaryGoal: "Memory Cards & Pattern Builder",
    avatarColor: "bg-amber-500",
  },
  {
    id: "c9999999-9999-4999-8999-999999999999",
    name: "Yuhas",
    age: 10,
    gender: "Male",
    supportLevel: 3,
    supportLevelLabel: "Level 3 - Unlocked Mastery",
    primaryGoal: "Emotion Reflection & Focus Games",
    avatarColor: "bg-teal-500",
  },
  {
    id: "c0000000-0000-4000-8000-000000000000",
    name: "Sayuni",
    age: 7,
    gender: "Female",
    supportLevel: 2,
    supportLevelLabel: "Level 2 - Guided Growth",
    primaryGoal: "Count Objects & Gentle Routine Practice",
    avatarColor: "bg-cyan-500",
  },
];

// Helper to format date YYYY-MM-DD
function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

const GAME_POOL = [
  "Emotion Face Match",
  "Situation Emotion Choice",
  "Memory Card Match",
  "Pattern Completion",
  "Daily Routine Order",
  "Feeling Need Choice",
  "Count the Objects",
  "Number Match",
];

// Time slot schedules strictly between 12:00 NOON and 5:00 PM (1-hour window for each child per day)
const STUDENT_TIME_SLOTS: Record<string, { startHour: number; startMin: number }> = {
  "c1111111-1111-4111-8111-111111111111": { startHour: 12, startMin: 0 }, // Dilruk: 12:00 PM - 01:00 PM
  "c2222222-2222-4222-8222-222222222222": { startHour: 12, startMin: 30 }, // Oneli: 12:30 PM - 01:30 PM
  "c3333333-3333-4333-8333-333333333333": { startHour: 13, startMin: 0 }, // Inuki: 01:00 PM - 02:00 PM
  "c4444444-4444-4444-8444-444444444444": { startHour: 13, startMin: 30 }, // Yunara: 01:30 PM - 02:30 PM
  "c5555555-5555-4555-8555-555555555555": { startHour: 14, startMin: 0 }, // Supuni: 02:00 PM - 03:00 PM
  "c6666666-6666-4666-8666-666666666666": { startHour: 14, startMin: 30 }, // Anusara: 02:30 PM - 03:30 PM
  "c7777777-7777-4777-8777-777777777777": { startHour: 15, startMin: 0 }, // Sakuni: 03:00 PM - 04:00 PM
  "c8888888-8888-4888-8888-888888888888": { startHour: 15, startMin: 30 }, // Rehan: 03:30 PM - 04:30 PM
  "c9999999-9999-4999-8999-999999999999": { startHour: 16, startMin: 0 }, // Yuhas: 04:00 PM - 05:00 PM
  "c0000000-0000-4000-8000-000000000000": { startHour: 12, startMin: 15 }, // Sayuni: 12:15 PM - 01:15 PM
};

function formatTime(hour: number, min: number): string {
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  const displayMin = min < 10 ? `0${min}` : `${min}`;
  return `${displayHour.toString().padStart(2, "0")}:${displayMin} ${ampm}`;
}

/**
 * Generates deterministic day-by-day attendance and play logs for students
 */
export function generateAttendanceLogs(
  startDateStr?: string,
  endDateStr?: string,
  studentIdFilter?: string
): DailyAttendanceLog[] {
  const endDate = endDateStr ? new Date(endDateStr) : new Date();
  const startDate = startDateStr
    ? new Date(startDateStr)
    : new Date(endDate.getTime() - 29 * 24 * 60 * 60 * 1000);

  const logs: DailyAttendanceLog[] = [];
  const days: Date[] = [];

  const curr = new Date(startDate);
  while (curr <= endDate) {
    days.push(new Date(curr));
    curr.setDate(curr.getDate() + 1);
  }

  // Fallback match by ID or student name if custom DB child passed
  const targetStudents = studentIdFilter
    ? MOCK_STUDENTS.filter((s) => s.id === studentIdFilter || s.name.toLowerCase() === studentIdFilter.toLowerCase())
    : MOCK_STUDENTS;

  const actualList = targetStudents.length > 0 ? targetStudents : MOCK_STUDENTS;

  actualList.forEach((student) => {
    const slotConfig = STUDENT_TIME_SLOTS[student.id] || { startHour: 12, startMin: 15 };

    days.forEach((day, dayIdx) => {
      const dateStr = formatDate(day);
      const dayOfWeekStr = day.toLocaleDateString("en-US", { weekday: "short" });
      const isWeekend = day.getDay() === 0 || day.getDay() === 6;

      const seed = (student.name.charCodeAt(0) || 1) + dayIdx * 7;
      
      let status: "Present" | "Missed" | "Partial" = "Present";
      if (isWeekend) {
        status = seed % 3 === 0 ? "Present" : "Missed";
      } else {
        if (seed % 11 === 0) status = "Partial";
        else if (seed % 17 === 0) status = "Missed";
      }

      if (status === "Missed") {
        logs.push({
          id: `log-${student.id}-${dateStr}`,
          studentId: student.id,
          studentName: student.name,
          date: dateStr,
          dayOfWeek: dayOfWeekStr,
          status: "Missed",
          sessionsCount: 0,
          startTime: "-",
          endTime: "-",
          playedMinutes: 0,
          accuracy: 0,
          gamesPlayed: [],
          notes: "No sessions recorded for this day.",
        });
        return;
      }

      const durationMins = status === "Partial" ? 25 + (seed % 15) : 50 + (seed % 11);
      const startMinOffset = (seed % 10);
      
      const startHour = slotConfig.startHour;
      const startMin = (slotConfig.startMin + startMinOffset) % 60;
      
      let endMinTotal = startHour * 60 + startMin + durationMins;
      if (endMinTotal > 1020) endMinTotal = 1020; // Cap at 5:00 PM
      
      const endHour = Math.floor(endMinTotal / 60);
      const endMin = endMinTotal % 60;

      const sessionsCount = status === "Partial" ? 1 : 2 + (seed % 2);
      const accuracy = 78 + (seed % 20);
      
      const g1 = GAME_POOL[(seed + dayIdx) % GAME_POOL.length];
      const g2 = GAME_POOL[(seed + dayIdx + 3) % GAME_POOL.length];
      const gamesPlayed = [g1, g2];

      logs.push({
        id: `log-${student.id}-${dateStr}`,
        studentId: student.id,
        studentName: student.name,
        date: dateStr,
        dayOfWeek: dayOfWeekStr,
        status,
        sessionsCount,
        startTime: formatTime(startHour, startMin),
        endTime: formatTime(endHour, endMin),
        playedMinutes: durationMins,
        accuracy,
        gamesPlayed,
        notes:
          status === "Partial"
            ? "Completed 1 focused activity session."
            : `Active participation across ${sessionsCount} learning sessions.`,
      });
    });
  });

  return logs.sort((a, b) => b.date.localeCompare(a.date) || a.studentName.localeCompare(b.studentName));
}

export interface StudentAttendanceSummary {
  student: StudentProfile;
  totalDays: number;
  daysPresent: number;
  daysPartial: number;
  daysMissed: number;
  attendanceRate: number;
  totalPlayedMinutes: number;
  totalPlayedHours: string;
  avgAccuracy: number;
  avgDailyMinutes: number;
  preferredTimeSlot: string;
}

export function getStudentSummary(
  studentIdOrName: string,
  startDateStr?: string,
  endDateStr?: string
): StudentAttendanceSummary | null {
  let student = MOCK_STUDENTS.find(
    (s) => s.id === studentIdOrName || s.name.toLowerCase() === studentIdOrName.toLowerCase()
  );

  if (!student) {
    // Dynamically fallback for any unknown child
    student = {
      id: studentIdOrName,
      name: studentIdOrName,
      age: 8,
      gender: "Child",
      supportLevel: 2,
      supportLevelLabel: "Level 2 - Guided Support",
      primaryGoal: "General Skill Development & Daily Routine",
      avatarColor: "bg-purple-500",
    };
  }

  const logs = generateAttendanceLogs(startDateStr, endDateStr, student.id);
  const totalDays = logs.length;
  const daysPresent = logs.filter((l) => l.status === "Present").length;
  const daysPartial = logs.filter((l) => l.status === "Partial").length;
  const daysMissed = logs.filter((l) => l.status === "Missed").length;

  const attendanceRate = totalDays > 0 ? Math.round(((daysPresent + daysPartial * 0.5) / totalDays) * 100) : 0;
  
  const totalPlayedMinutes = logs.reduce((sum, l) => sum + l.playedMinutes, 0);
  const totalPlayedHours = (totalPlayedMinutes / 60).toFixed(1);
  
  const activeLogs = logs.filter((l) => l.status !== "Missed");
  const avgAccuracy = activeLogs.length > 0
    ? Math.round(activeLogs.reduce((sum, l) => sum + l.accuracy, 0) / activeLogs.length)
    : 0;

  const avgDailyMinutes = activeLogs.length > 0
    ? Math.round(totalPlayedMinutes / activeLogs.length)
    : 0;

  const slotConfig = STUDENT_TIME_SLOTS[student.id] || { startHour: 12, startMin: 30 };
  const preferredTimeSlot = `${formatTime(slotConfig.startHour, slotConfig.startMin)} - ${formatTime(
    slotConfig.startHour + 1,
    slotConfig.startMin
  )} (12 PM - 5 PM Window)`;

  return {
    student,
    totalDays,
    daysPresent,
    daysPartial,
    daysMissed,
    attendanceRate,
    totalPlayedMinutes,
    totalPlayedHours,
    avgAccuracy,
    avgDailyMinutes,
    preferredTimeSlot,
  };
}
