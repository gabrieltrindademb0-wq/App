import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Pencil, Save, X, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { DayWorkout, Exercise, loadWeekData, saveWeekData, WeekData } from "@/lib/workoutData";
import ExerciseCard from "@/components/ExerciseCard";
import ExerciseDetail from "@/components/ExerciseDetail";
import { useToast } from "@/hooks/use-toast";

interface DayScreenProps {
  dayKey: string;
  onBack: () => void;
}

const sectionColors: Record<string, string> = {
  "Alongamento": "text-accent",
  "Warm-up": "text-orange-400",
  "Skill": "text-primary",
  "WOD": "text-destructive",
  "Complemento": "text-muted-foreground",
};

const sectionIcons: Record<string, string> = {
  "Alongamento": "🧘",
  "Warm-up": "🔥",
  "Skill": "🎯",
  "WOD": "⚡",
  "Complemento": "📋",
};

const DayScreen = ({ dayKey, onBack }: DayScreenProps) => {
  const [weekData, setWeekData] = useState<WeekData>(loadWeekData);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const { toast } = useToast();

  const day: DayWorkout | undefined = weekData[dayKey];
  if (!day) return null;

  const handleUpdateExercise = (sectionIdx: number, exerciseId: string, field: "name" | "gifUrl" | "notes", value: string) => {
    setWeekData((prev) => {
      const updated = { ...prev };
      const dayData = { ...updated[dayKey] };
      const sections = [...dayData.sections];
      const section = { ...sections[sectionIdx] };
      section.exercises = section.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, [field]: value } : ex
      );
      sections[sectionIdx] = section;
      dayData.sections = sections;
      updated[dayKey] = dayData;
      return updated;
    });
  };

  const handleAddExercise = (sectionIdx: number) => {
    setWeekData((prev) => {
      const updated = { ...prev };
      const dayData = { ...updated[dayKey] };
      const sections = [...dayData.sections];
      const section = { ...sections[sectionIdx] };
      const newExercise: Exercise = {
        id: `ex-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: "Novo exercício",
        notes: "",
        gifUrl: "",
      };
      section.exercises = [...section.exercises, newExercise];
      sections[sectionIdx] = section;
      dayData.sections = sections;
      updated[dayKey] = dayData;
      return updated;
    });
  };

  const handleRemoveExercise = (sectionIdx: number, exerciseId: string) => {
    setWeekData((prev) => {
      const updated = { ...prev };
      const dayData = { ...updated[dayKey] };
      const sections = [...dayData.sections];
      const section = { ...sections[sectionIdx] };
      section.exercises = section.exercises.filter((ex) => ex.id !== exerciseId);
      sections[sectionIdx] = section;
      dayData.sections = sections;
      updated[dayKey] = dayData;
      return updated;
    });
  };

  const handleUpdateSection = (sectionIdx: number, field: "duration" | "description", value: string) => {
    setWeekData((prev) => {
      const updated = { ...prev };
      const dayData = { ...updated[dayKey] };
      const sections = [...dayData.sections];
      sections[sectionIdx] = { ...sections[sectionIdx], [field]: value };
      dayData.sections = sections;
      updated[dayKey] = dayData;
      return updated;
    });
  };

  const handleSave = () => {
    saveWeekData(weekData);
    setIsEditing(false);
    toast({
      title: "✅ Treino salvo!",
      description: `${day.day} atualizado com sucesso.`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="min-h-screen bg-background"
    >
      {/* Exercise Detail Overlay */}
      <AnimatePresence>
        {selectedExercise && (() => {
          const flat = day.sections.flatMap((s) =>
            s.exercises.map((ex) => ({ ...ex, category: s.title }))
          );
          const current = flat.find((e) => e.id === selectedExercise.id) ?? {
            ...selectedExercise,
            category: "",
          };
          return (
            <ExerciseDetail
              exercise={current}
              exercises={flat}
              onChange={(ex) => setSelectedExercise(ex)}
              onBack={() => setSelectedExercise(null)}
            />
          );
        })()}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 z-10 glass-effect px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="text-center">
            <h1 className="text-lg font-display font-bold text-foreground">{day.icon} {day.day}</h1>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isEditing ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
            }`}
          >
            {isEditing ? <Save size={18} /> : <Pencil size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 pb-8 pt-4 space-y-8">
        {day.sections.map((section, sIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sIdx * 0.12, duration: 0.4 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">{sectionIcons[section.title] || "📋"}</span>
                <h2 className={`text-xl font-display font-bold ${sectionColors[section.title] || "text-foreground"}`}>
                  {section.title}
                </h2>
                {isEditing ? (
                  <input
                    type="text"
                    value={section.duration}
                    onChange={(e) => handleUpdateSection(sIdx, "duration", e.target.value)}
                    className="ml-auto bg-muted border border-border rounded-lg px-2.5 py-1 text-xs text-primary font-bold w-20 text-center focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                ) : (
                  section.duration && (
                    <span className="ml-auto text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                      {section.duration}
                    </span>
                  )
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={section.description}
                  onChange={(e) => handleUpdateSection(sIdx, "description", e.target.value)}
                  placeholder="Descrição da seção (ex: cada exercício 1 min)"
                  className="mt-2 w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              ) : (
                section.description && (
                  <p className="mt-1.5 text-xs text-muted-foreground font-body ml-8">
                    {section.description}
                  </p>
                )
              )}
              <div className="h-px bg-border mt-3" />
            </div>
            <div className="space-y-2.5">
              {section.exercises.map((exercise, eIdx) => (
                <div key={exercise.id} className="relative">
                  <ExerciseCard
                    exercise={exercise}
                    index={eIdx}
                    isEditing={isEditing}
                    onUpdate={(id, field, value) => handleUpdateExercise(sIdx, id, field, value)}
                    onTap={() => setSelectedExercise(exercise)}
                  />
                  {isEditing && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      whileTap={{ scale: 0.85 }}
                      onClick={() => handleRemoveExercise(sIdx, exercise.id)}
                      className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg z-10"
                      aria-label="Remover exercício"
                    >
                      <Trash2 size={12} />
                    </motion.button>
                  )}
                </div>
              ))}
              {isEditing && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAddExercise(sIdx)}
                  className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <Plus size={16} />
                  <span className="font-display font-medium text-xs">Adicionar exercício</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-display font-bold text-sm"
            >
              💾 Salvar Treino
            </button>
            <button
              onClick={() => { setWeekData(loadWeekData()); setIsEditing(false); }}
              className="py-3 px-5 rounded-xl bg-secondary text-secondary-foreground font-display font-medium text-sm"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DayScreen;
