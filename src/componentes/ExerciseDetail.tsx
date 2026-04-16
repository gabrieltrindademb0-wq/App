import { motion } from "framer-motion";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Exercise, speakText } from "@/lib/workoutData";
import { useState } from "react";

interface ExerciseDetailProps {
  exercise: Exercise;
  onBack: () => void;
}

const ExerciseDetail = ({ exercise, onBack }: ExerciseDetailProps) => {
  const [imgError, setImgError] = useState(false);

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
        <span className="text-xs text-muted-foreground font-body">Detalhes do exercício</span>
        <div className="w-10" />
      </div>

      {/* GIF */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-secondary border border-border card-elevated mb-8">
          {exercise.gifUrl && !imgError ? (
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-7xl">🏋️</span>
            </div>
          )}
        </div>

        {/* Name + Notes + Audio */}
        <div className="w-full max-w-sm">
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
      </div>
    </motion.div>
  );
};

export default ExerciseDetail;
