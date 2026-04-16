import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell } from "lucide-react";
import { useState } from "react";
import { loadWeekData } from "@/lib/workoutData";
import DayCard from "@/components/DayCard";
import DayScreen from "@/components/DayScreen";

const dayOrder = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado"];

const HomeScreen = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const weekData = loadWeekData();

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {selectedDay ? (
          <DayScreen
            key={selectedDay}
            dayKey={selectedDay}
            onBack={() => setSelectedDay(null)}
          />
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="max-w-lg mx-auto px-4 pb-10"
          >
            {/* Header */}
            <div className="pt-12 pb-8 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4 animate-pulse-neon"
              >
                <Dumbbell className="text-primary" size={28} />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-3xl font-display font-bold text-foreground"
              >
                Cross<span className="text-primary">Fit</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="text-muted-foreground text-sm mt-1 font-body"
              >
                Seu treino semanal
              </motion.p>
            </div>

            {/* Day cards */}
            <div className="space-y-3">
              {dayOrder.map((key, idx) => {
                const d = weekData[key];
                if (!d) return null;
                return (
                  <DayCard
                    key={key}
                    dayKey={key}
                    day={d.day}
                    shortDay={d.shortDay}
                    icon={d.icon}
                    index={idx}
                    onClick={() => setSelectedDay(key)}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
