import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Plus, Pencil, Check, Trash2, X } from "lucide-react";
import { useState } from "react";
import { loadWeekData, saveWeekData, WeekData, DayWorkout } from "@/lib/workoutData";
import DayCard from "@/components/DayCard";
import DayScreen from "@/components/DayScreen";
import { useToast } from "@/hooks/use-toast";

const HomeScreen = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [weekData, setWeekData] = useState<WeekData>(loadWeekData);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDay, setShowAddDay] = useState(false);
  const [newDayName, setNewDayName] = useState("");
  const [newDayIcon, setNewDayIcon] = useState("💪");
  const { toast } = useToast();

  const dayKeys = Object.keys(weekData);

  const persist = (data: WeekData) => {
    setWeekData(data);
    saveWeekData(data);
  };

  const handleAddDay = () => {
    const name = newDayName.trim();
    if (!name) {
      toast({ title: "Nome obrigatório", description: "Informe o nome do dia." });
      return;
    }
    const key = `dia-${Date.now()}`;
    const shortDay = name.slice(0, 3).toUpperCase();
    const newDay: DayWorkout = {
      day: name,
      shortDay,
      icon: newDayIcon || "💪",
      sections: [],
    };
    persist({ ...weekData, [key]: newDay });
    setNewDayName("");
    setNewDayIcon("💪");
    setShowAddDay(false);
    toast({ title: "✅ Dia adicionado!", description: `${name} criado.` });
  };

  const handleRemoveDay = (key: string, dayName: string) => {
    if (!confirm(`Remover "${dayName}" e todos os seus treinos?`)) return;
    const updated = { ...weekData };
    delete updated[key];
    persist(updated);
    toast({ title: "🗑️ Dia removido", description: `${dayName} excluído.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {selectedDay ? (
          <DayScreen
            key={selectedDay}
            dayKey={selectedDay}
            onBack={() => {
              setWeekData(loadWeekData());
              setSelectedDay(null);
            }}
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
            <div className="pt-12 pb-8 text-center relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsEditing(!isEditing)}
                className={`absolute top-12 right-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  isEditing ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
                aria-label="Editar dias"
              >
                {isEditing ? <Check size={18} /> : <Pencil size={18} />}
              </motion.button>
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
                Tre<span className="text-primary">ino</span>
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
              {dayKeys.map((key, idx) => {
                const d = weekData[key];
                if (!d) return null;
                return (
                  <div key={key} className="relative">
                    <DayCard
                      dayKey={key}
                      day={d.day}
                      shortDay={d.shortDay}
                      icon={d.icon}
                      index={idx}
                      onClick={() => !isEditing && setSelectedDay(key)}
                    />
                    {isEditing && (
                      <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleRemoveDay(key, d.day)}
                        className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-lg z-10"
                        aria-label={`Remover ${d.day}`}
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    )}
                  </div>
                );
              })}

              {/* Add Day */}
              {isEditing && (
                <AnimatePresence mode="wait">
                  {showAddDay ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl bg-secondary border border-border p-4 space-y-3"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newDayIcon}
                          onChange={(e) => setNewDayIcon(e.target.value)}
                          maxLength={2}
                          placeholder="💪"
                          className="w-14 bg-muted border border-border rounded-lg px-2 py-2 text-center text-xl focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <input
                          type="text"
                          value={newDayName}
                          onChange={(e) => setNewDayName(e.target.value)}
                          placeholder="Nome do dia (ex: Domingo)"
                          autoFocus
                          className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={handleAddDay}
                          className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground font-display font-bold text-sm"
                        >
                          ✅ Adicionar
                        </button>
                        <button
                          onClick={() => { setShowAddDay(false); setNewDayName(""); }}
                          className="px-4 py-2.5 rounded-lg bg-muted text-foreground"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setShowAddDay(true)}
                      className="w-full py-4 rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                    >
                      <Plus size={18} />
                      <span className="font-display font-medium text-sm">Adicionar dia</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeScreen;
