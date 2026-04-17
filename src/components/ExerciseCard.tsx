import { motion } from "framer-motion";
import { Exercise } from "@/lib/workoutData";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  isEditing: boolean;
  onUpdate: (id: string, field: "name" | "gifUrl" | "notes", value: string) => void;
  onTap: () => void;
}

const ExerciseCard = ({ exercise, index, isEditing, onUpdate, onTap }: ExerciseCardProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      whileTap={!isEditing ? { scale: 0.97 } : undefined}
      onClick={!isEditing ? onTap : undefined}
      className="rounded-xl bg-secondary border border-border overflow-hidden card-elevated cursor-pointer"
    >
      <div className="flex items-center gap-3 p-3.5">
        <div className="w-11 h-11 rounded-lg overflow-hidden bg-muted flex-shrink-0 flex items-center justify-center">
          {exercise.gifUrl && !imgError ? (
            <img
              src={exercise.gifUrl}
              alt={exercise.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
              loading="lazy"
            />
          ) : (
            <span className="text-lg">🏋️</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={exercise.name}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onUpdate(exercise.id, "name", e.target.value)}
                placeholder="Nome do exercício"
                className="w-full bg-muted border border-border rounded-lg px-3 py-1.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={exercise.notes}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onUpdate(exercise.id, "notes", e.target.value)}
                placeholder="Observação (ex: 30 de cada lado)"
                className="w-full bg-muted border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                type="text"
                value={exercise.gifUrl}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => onUpdate(exercise.id, "gifUrl", e.target.value)}
                placeholder="URL do GIF"
                className="w-full bg-muted border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground line-clamp-1">{exercise.name}</p>
              {exercise.notes && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{exercise.notes}</p>
              )}
            </>
          )}
        </div>
        {!isEditing && (
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        )}
      </div>
    </motion.div>
  );
};

export default ExerciseCard;
