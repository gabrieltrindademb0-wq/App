export interface Exercise {
  id: string;
  name: string;
  notes: string;
  gifUrl: string;
}

export interface WorkoutSection {
  title: string;
  duration: string;
  description: string;
  exercises: Exercise[];
}

export interface DayWorkout {
  day: string;
  shortDay: string;
  icon: string;
  sections: WorkoutSection[];
}

export type WeekData = Record<string, DayWorkout>;

const STORAGE_KEY = "crossfit-week-data-v5";

export const defaultWeekData: WeekData = {
  segunda: {
    day: "Segunda-feira",
    shortDay: "SEG",
    icon: "💪",
    sections: [
      {
        title: "Alongamento",
        duration: "5 min",
        description: "Upper Body — :30 de cada lado em cada exercício",
        exercises: [
          { id: "seg-a1", name: "Banded Lat Stretch", notes: ":30 cada lado", gifUrl: "" },
          { id: "seg-a2", name: "Banded Triceps Stretch", notes: ":30 cada lado", gifUrl: "" },
          { id: "seg-a3", name: "Banded Pec Stretch", notes: ":30 cada lado", gifUrl: "" },
        ],
      },
      {
        title: "Warm-up",
        duration: "12 min",
        description: "EMOM 12' — 1 movimento por minuto",
        exercises: [
          { id: "seg-w1", name: "Mountain Climbers", notes: "Min 1", gifUrl: "" },
          { id: "seg-w2", name: "Flutter Kicks + Superman Hold", notes: "Min 2 — 30\" cada", gifUrl: "" },
          { id: "seg-w3", name: "Kipping Swing + Knee to Chest", notes: "Min 3 — 10 reps + máx", gifUrl: "" },
          { id: "seg-w4", name: "Muscle Clean + Front Squat", notes: "Min 4 — 5 reps + máx", gifUrl: "" },
        ],
      },
      {
        title: "Skill",
        duration: "10 min",
        description: "AMRAP 10' — passar por todos os movimentos sem parar",
        exercises: [
          { id: "seg-s1", name: "Calorie Row / Double Unders", notes: "20 Cal ou 50 DU", gifUrl: "" },
          { id: "seg-s2", name: "Toes to Bar", notes: "15 reps", gifUrl: "" },
          { id: "seg-s3", name: "Front Squats", notes: "5 reps — 115/75lb", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "17 min",
        description: "5 Rounds for time — carga sobe a cada round. Time Cap: 17:00",
        exercises: [
          { id: "seg-wod0", name: "Rope Climbs", notes: "2-2-2-1-1 reps", gifUrl: "" },
          { id: "seg-wod1", name: "Run", notes: "200m entre rounds", gifUrl: "" },
          { id: "seg-wod2", name: "Cleans", notes: "Rd1: 5x115lb | Rd2: 4x135lb | Rd3: 3x155lb", gifUrl: "" },
          { id: "seg-wod3", name: "Cleans", notes: "Rd4: 2x185lb | Rd5: 1x205lb", gifUrl: "" },
        ],
      },
      {
        title: "Complemento",
        duration: "10 min",
        description: "3 Sets — sem tempo definido, foco na qualidade",
        exercises: [
          { id: "seg-c1", name: "GHD Sit-ups", notes: "20 reps", gifUrl: "" },
          { id: "seg-c2", name: "Alternating Pistols", notes: "16 reps", gifUrl: "" },
          { id: "seg-c3", name: "Strict Pull-ups", notes: "10 reps", gifUrl: "" },
        ],
      },
    ],
  },
  terca: {
    day: "Terça-feira",
    shortDay: "TER",
    icon: "🔥",
    sections: [
      {
        title: "Alongamento",
        duration: "5 min",
        description: "Upper Body — 1 minuto em cada posição",
        exercises: [
          { id: "ter-a1", name: "Child's Pose", notes: "1:00", gifUrl: "" },
          { id: "ter-a2", name: "Shoulder to Floor Stretch", notes: "1:00 cada lado", gifUrl: "" },
          { id: "ter-a3", name: "Cat Cow", notes: "1:00", gifUrl: "" },
          { id: "ter-a4", name: "Partner Assisted Thoracic Spine", notes: "1:00", gifUrl: "" },
        ],
      },
      {
        title: "Warm-up",
        duration: "10 min",
        description: "2-3 Rounds — foco em ativação de ombro e overhead",
        exercises: [
          { id: "ter-w1", name: "One Arm OH Walk", notes: "15m cada lado", gifUrl: "" },
          { id: "ter-w2", name: "Strict Press", notes: "10 reps cada lado", gifUrl: "" },
          { id: "ter-w3", name: "Lateral Box Step Down KB", notes: "5 reps cada lado", gifUrl: "" },
          { id: "ter-w4", name: "Box Inchworms", notes: "3 reps", gifUrl: "" },
          { id: "ter-w5", name: "Box HSPU + HS Hold", notes: "3 reps + 15\" hold", gifUrl: "" },
        ],
      },
      {
        title: "Skill",
        duration: "20 min",
        description: "Passagem técnica de HSPU — 3 Rounds de 4min com rest 1'",
        exercises: [
          { id: "ter-s1", name: "HSPU", notes: "10 reps", gifUrl: "" },
          { id: "ter-s2", name: "Dual DB Deadlift", notes: "10 reps", gifUrl: "" },
          { id: "ter-s3", name: "One DB Box Step Over", notes: "10 reps — 20\"", gifUrl: "" },
          { id: "ter-s4", name: "HSPU (máx reps)", notes: "Rest 1' entre rounds", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "16 min",
        description: "EMOM 16' (4 Rounds) — manter ritmo constante",
        exercises: [
          { id: "ter-wod1", name: "Push Press", notes: "Min 1: 12-15 reps (95/65lb)", gifUrl: "" },
          { id: "ter-wod2", name: "Burpee Box Jump Overs", notes: "Min 2: 9-12 reps — 24\"/20\"", gifUrl: "" },
          { id: "ter-wod3", name: "Strict HSPU", notes: "Min 3: 6-9 reps", gifUrl: "" },
          { id: "ter-wod4", name: "Cal Bike / Row / Ski", notes: "Min 4: máx calorias", gifUrl: "" },
        ],
      },
      {
        title: "Complemento",
        duration: "10 min",
        description: "3 Rounds — foco em acessórios e core",
        exercises: [
          { id: "ter-c1", name: "Seated DB Lateral Raises", notes: "12 reps", gifUrl: "" },
          { id: "ter-c2", name: "Banded Triceps", notes: "30 reps", gifUrl: "" },
          { id: "ter-c3", name: "Lateral Plank KB", notes: ":30 cada lado", gifUrl: "" },
          { id: "ter-c4", name: "Nordic Hamstring Curl", notes: "8 reps", gifUrl: "" },
        ],
      },
    ],
  },
  quarta: {
    day: "Quarta-feira",
    shortDay: "QUA",
    icon: "⚡",
    sections: [
      {
        title: "Alongamento",
        duration: "5 min",
        description: "Lower Body — 1 minuto em cada posição",
        exercises: [
          { id: "qua-a1", name: "Half Lotus", notes: "1:00 cada lado", gifUrl: "" },
          { id: "qua-a2", name: "Pike Stretch", notes: "1:00", gifUrl: "" },
          { id: "qua-a3", name: "The Brettzel", notes: "1:00 cada lado", gifUrl: "" },
        ],
      },
      {
        title: "Warm-up",
        duration: "10 min",
        description: "3 Sets — 30\" on / 10\" off em cada movimento",
        exercises: [
          { id: "qua-w1", name: "Goblet Cossack Squat", notes: "30\" on / 10\" off", gifUrl: "" },
          { id: "qua-w2", name: "Goblet Bottom Squat Hold", notes: "30\" on / 10\" off", gifUrl: "" },
          { id: "qua-w3", name: "Goblet Lunge Pulse", notes: "30\" cada lado", gifUrl: "" },
          { id: "qua-w4", name: "KB One Arm Row", notes: "30\" cada lado", gifUrl: "" },
          { id: "qua-w5", name: "Kipping Swings", notes: "30\" on / 10\" off", gifUrl: "" },
        ],
      },
      {
        title: "Skill",
        duration: "25 min",
        description: "Back Squat — progressão até 1RM",
        exercises: [
          { id: "qua-s1", name: "Back Squat", notes: "50%-2 | 60%-2 | 70%-2 | 80%-2", gifUrl: "" },
          { id: "qua-s2", name: "Back Squat", notes: "85%-2 | 90%-1 | 95%-1", gifUrl: "" },
          { id: "qua-s3", name: "Back Squat 1RM", notes: "🏆 FIND 1 RM", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "6 min",
        description: "For time — Time Cap: 6:00",
        exercises: [
          { id: "qua-wod1", name: "Clean & Jerk", notes: "30 reps (135/95lb)", gifUrl: "" },
        ],
      },
      {
        title: "Complemento",
        duration: "10 min",
        description: "3 Rounds — acessórios de braço",
        exercises: [
          { id: "qua-c1", name: "DB Bicep Curl", notes: "12 reps", gifUrl: "" },
          { id: "qua-c2", name: "Banded Seated Rows", notes: "20 reps", gifUrl: "" },
          { id: "qua-c3", name: "DB Hammer Curls", notes: "12 reps", gifUrl: "" },
        ],
      },
    ],
  },
  quinta: {
    day: "Quinta-feira",
    shortDay: "QUI",
    icon: "🏆",
    sections: [
      {
        title: "Alongamento",
        duration: "5 min",
        description: "Mobilidade de quadril e glúteo",
        exercises: [
          { id: "qui-a1", name: "90 to 90", notes: "16-12-8 reps", gifUrl: "" },
          { id: "qui-a2", name: "Spiderman Stretch Rotation", notes: "cada lado", gifUrl: "" },
          { id: "qui-a3", name: "Single Leg Glute Bridge", notes: "cada lado", gifUrl: "" },
          { id: "qui-a4", name: "Star Plank Abduction", notes: "30\" cada lado — após cada round", gifUrl: "" },
        ],
      },
      {
        title: "Warm-up",
        duration: "8 min",
        description: "3 Rounds — ativação com barra",
        exercises: [
          { id: "qui-w1", name: "Front Rack Elbow Rotation", notes: "10 reps", gifUrl: "" },
          { id: "qui-w2", name: "Hang Clean + High Hang Clean", notes: "3+3 reps", gifUrl: "" },
          { id: "qui-w3", name: "Strict Press + Push Press", notes: "3+3 reps", gifUrl: "" },
        ],
      },
      {
        title: "Skill",
        duration: "20 min",
        description: "Técnica de Clean & Jerk — progressão de carga",
        exercises: [
          { id: "qui-s1", name: "Tall Clean + Jerk Balance", notes: "3+3 x 3 Sets", gifUrl: "" },
          { id: "qui-s2", name: "Hang Clean + Jerk", notes: "50%-2+2 | 60%-2+2 | 70%-1+1", gifUrl: "" },
          { id: "qui-s3", name: "Hang Clean + Jerk", notes: "80%-1+1 | 85%-1+1", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "15 min",
        description: "Partner WOD — Every 3min x 4 Rounds, rest 1' entre rounds",
        exercises: [
          { id: "qui-wod1", name: "Run + Row", notes: "200m Run + 250m Row together", gifUrl: "" },
          { id: "qui-wod2", name: "Farmer Carry", notes: "30m (15m cada, pesado)", gifUrl: "" },
          { id: "qui-wod3", name: "Alternating Clean & Jerk", notes: "Máx reps — 155/105lb — troca a cada rep", gifUrl: "" },
        ],
      },
    ],
  },
  sexta: {
    day: "Sexta-feira",
    shortDay: "SEX",
    icon: "💥",
    sections: [
      {
        title: "Alongamento",
        duration: "5 min",
        description: "Lower Body — 1 minuto em cada posição",
        exercises: [
          { id: "sex-a1", name: "QL Stretch", notes: "1:00 cada lado", gifUrl: "" },
          { id: "sex-a2", name: "Single Leg Hamstring Stretch", notes: "1:00 cada lado", gifUrl: "" },
          { id: "sex-a3", name: "Pike Stretch", notes: "1:00", gifUrl: "" },
          { id: "sex-a4", name: "Quadruped Rock Back", notes: "1:00", gifUrl: "" },
        ],
      },
      {
        title: "Warm-up",
        duration: "8 min",
        description: "AMRAP 8' — 2 sets de mobilidade + AMRAP com KB e PVC",
        exercises: [
          { id: "sex-w1", name: "Scorpions + Cat Cow", notes: "5+5 reps", gifUrl: "" },
          { id: "sex-w2", name: "Russian Baby Makers", notes: "5 reps", gifUrl: "" },
          { id: "sex-w3", name: "Single Leg RDL KB + Strict Press", notes: "5 reps cada lado", gifUrl: "" },
          { id: "sex-w4", name: "PVC Pass + PVC Snatch Balance", notes: "5+5 reps", gifUrl: "" },
        ],
      },
      {
        title: "Skill",
        duration: "25 min",
        description: "Técnica de Snatch + Deadlift — progressão até 1RM",
        exercises: [
          { id: "sex-s0", name: "Tall Snatch + Snatch Balance", notes: "3+3 x 3 Sets", gifUrl: "" },
          { id: "sex-s1", name: "Deadlift", notes: "50%-2 | 60%-2 | 70%-2 | 80%-2", gifUrl: "" },
          { id: "sex-s2", name: "Deadlift", notes: "85%-2 | 90%-1 | 95%-1", gifUrl: "" },
          { id: "sex-s3", name: "Deadlift 1RM", notes: "🏆 FIND 1 RM", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "10 min",
        description: "For time — ida e volta. Time Cap: 10:00",
        exercises: [
          { id: "sex-wod1", name: "Deadlifts", notes: "6 reps (185/125lb)", gifUrl: "" },
          { id: "sex-wod2", name: "Bar Muscle-ups", notes: "12 reps", gifUrl: "" },
          { id: "sex-wod3", name: "One DB Squat", notes: "24 reps (50/35lb)", gifUrl: "" },
          { id: "sex-wod4", name: "Double Unders", notes: "60 reps", gifUrl: "" },
          { id: "sex-wod5", name: "One DB Squat", notes: "24 reps", gifUrl: "" },
          { id: "sex-wod6", name: "Bar Muscle-ups", notes: "12 reps", gifUrl: "" },
          { id: "sex-wod7", name: "Deadlifts", notes: "6 reps", gifUrl: "" },
        ],
      },
      {
        title: "Complemento",
        duration: "12 min",
        description: "4 Rounds cada bloco — :30 rest entre sets",
        exercises: [
          { id: "sex-c1", name: "Ring Dips", notes: "8 reps — :30 rest", gifUrl: "" },
          { id: "sex-c2", name: "Lunge Pulse Right Leg (Dual DB)", notes: "15 reps — :30 rest", gifUrl: "" },
          { id: "sex-c3", name: "Lunge Pulse Left Leg (Dual DB)", notes: "15 reps — :30 rest", gifUrl: "" },
        ],
      },
    ],
  },
  sabado: {
    day: "Sábado",
    shortDay: "SÁB",
    icon: "🎯",
    sections: [
      {
        title: "Warm-up",
        duration: "10 min",
        description: "Aquecimento lúdico — livre",
        exercises: [
          { id: "sab-w1", name: "Aquecimento Lúdico", notes: "Livre", gifUrl: "" },
        ],
      },
      {
        title: "WOD",
        duration: "42 min",
        description: "Partner WOD Pyramid — 400m Run together entre cada bloco. Time Cap: 42:00",
        exercises: [
          { id: "sab-wod1", name: "KB Swing + Box Jumps + Burpees over KB", notes: "5 Rounds — 6 reps cada", gifUrl: "" },
          { id: "sab-wod2", name: "KB Swing + Box Jumps + Burpees over KB", notes: "4 Rounds — 8 reps cada", gifUrl: "" },
          { id: "sab-wod3", name: "KB Swing + Box Jumps + Burpees over KB", notes: "3 Rounds — 10 reps cada", gifUrl: "" },
          { id: "sab-wod4", name: "KB Swing + Box Jumps + Burpees over KB", notes: "2 Rounds — 12 reps cada", gifUrl: "" },
          { id: "sab-wod5", name: "KB Swing + Box Jumps + Burpees over KB", notes: "1 Round — 14 reps cada", gifUrl: "" },
          { id: "sab-wod6", name: "Equipamento", notes: "KB 28/20kg | Box 24/20\"", gifUrl: "" },
        ],
      },
    ],
  },
};

export function loadWeekData(): WeekData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultWeekData;
}

export function saveWeekData(data: WeekData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function speakText(text: string): void {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
}
