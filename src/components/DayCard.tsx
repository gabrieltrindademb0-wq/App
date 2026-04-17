import { motion } from "framer-motion";
import { Dumbbell, ChevronRight } from "lucide-react";

interface DayCardProps {
  dayKey: string;
  day: string;
  shortDay: string;
  icon: string;
  index: number;
  onClick: () => void;
}

const DayCard = ({ dayKey, day, shortDay, icon, index, onClick }: DayCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full rounded-2xl bg-card border border-border p-5 card-elevated flex items-center gap-4 text-left group"
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base font-display font-bold text-foreground">{day}</p>
        <p className="text-xs text-muted-foreground mt-0.5 font-body">Toque para ver o treino</p>
      </div>
      <div className="text-muted-foreground group-hover:text-primary transition-colors">
        <ChevronRight size={20} />
      </div>
    </motion.button>
  );
};

export default DayCard;
