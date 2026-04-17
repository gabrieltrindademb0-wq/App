import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Volume2, ChevronLeft, ChevronRight } from "lucide-react";
import { Exercise, speakText } from "@/lib/workoutData";
import { useState } from "react";

type ExerciseWithCategory = Exercise & { category?: string };

interface ExerciseDetailProps {
  exercise: ExerciseWithCategory;
  onBack: () => void;
  exercises?: ExerciseWithCategory[];
  onChange?: (exercise: ExerciseWithCategory) => void;
}

const categoryStyles: Record<string, { color: string; icon: string }> = {
  "Alongamento": { color: "bg-accent/15 text-accent border-accent/30", icon: "🧘" },
  "Warm-up": { color: "bg-orange-400/15 text-orange-400 border-orange-400/30", icon: "🔥" },
  "Skill": { color: "bg-primary/15 text-primary border-primary/30", icon: "🎯" },
  "WOD": { color: "bg-destructive/15 text-destructive border-destructive/30", icon: "⚡" },
  "Complemento": { color: "bg-muted text-muted-foreground border-border", icon: "📋" },
};

const ExerciseDetail = ({ exercise, onBack, exercises, onChange }: ExerciseDetailProps) => {
  const [imgError, setImgError] = useState(false);
  const [direction, setDirection] = useState(0);

  const list = exercises ?? [];
  const currentIndex = list.findIndex((e) => e.id === exercise.id);
  const hasList = list.length > 1 && currentIndex !== -1;

  const goTo = (offset: number) => {
    if (!hasList || !onChange) return;
    const next = currentIndex + offset;
    if (next < 0 || next >= list.length) return;
    setDirection(offset);
    setImgError(false);
    onChange(list[next]);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipe = info.offset.x;
    const velocity = info.velocity.x;
    if (swipe < -80 || velocity < -500) goTo(1);
    else if (swipe > 80 || velocity > 500) goTo(-1);
  };

  const canPrev = hasList && currentIndex > 0;
  const canNext = hasList && currentIndex < list.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-background flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground"
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground font-body">Detalhes do exercício</span>
          {hasList && (
            <span className="text-[10px] text-primary font-bold mt-0.5">
              {currentIndex + 1} / {list.length}
            </span>
          )}
        </div>
        <div className="w-10" />
      </div>

      {/* Swipeable content */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={exercise.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 80 : direction < 0 ? -80 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            drag={hasList ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
          >
            <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-secondary border border-border card-elevated mb-8 select-none">
              {exercise.gifUrl && !imgError ? (
                <img
                  src={exercise.gifUrl}
                  alt={exercise.name}
                  draggable={false}
                  className="w-full h-full object-cover pointer-events-none"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl">🏋️</span>
                </div>
              )}
            </div>

            <div className="w-full max-w-sm">
              {exercise.category && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-display font-bold uppercase tracking-wide mb-3 ${
                    categoryStyles[exercise.category]?.color ?? "bg-secondary text-foreground border-border"
                  }`}
                >
                  <span>{categoryStyles[exercise.category]?.icon ?? "📋"}</span>
                  {exercise.category}
                </motion.div>
              )}
              <div className="flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-display font-bold text-foreground leading-tight">
                    {exercise.name}
                  </h2>
                </div>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={() => speakText(exercise.name)}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground flex-shrink-0 animate-pulse-neon"
                >
                  <Volume2 size={24} />
                </motion.button>
              </div>
              {exercise.notes && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mt-3 text-sm text-muted-foreground font-body bg-secondary rounded-xl px-4 py-3 border border-border"
                >
                  📝 {exercise.notes}
                </motion.p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        {canPrev && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => goTo(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center text-foreground border border-border"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </motion.button>
        )}
        {canNext && (
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => goTo(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center text-foreground border border-border"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </motion.button>
        )}
      </div>

      {hasList && (
        <p className="text-center text-[11px] text-muted-foreground pb-4 font-body">
          Arraste para o lado para trocar de exercício
        </p>
      )}
    </motion.div>
  );
};

export default ExerciseDetail;
