import { useState, useEffect } from 'react';
import { Droplets, CheckCircle2, Circle } from 'lucide-react';
import { motion } from 'motion/react';
import { WorkoutType, defaultDayTypes, getWorkoutDetails, gymRoutines } from '../../lib/workouts';

export function HomeTab() {
  const [water, setWater] = useState(0);
  const waterGoal = 3960; // 88kg * 45ml
  const [creatineTaken, setCreatineTaken] = useState(false);

  const [dayTypes, setDayTypes] = useState<Record<number, WorkoutType>>(defaultDayTypes);

  useEffect(() => {
    const savedTypes = localStorage.getItem('yurifit_dayTypes');
    if (savedTypes) setDayTypes(JSON.parse(savedTypes));
  }, []);

  const currentDay = new Date().getDay();
  const todayType = dayTypes[currentDay];
  const todayDetails = getWorkoutDetails(currentDay, todayType);
  
  let subtitle = "";
  if (todayType === 'Gym') {
    const exercisesCount = gymRoutines[currentDay]?.exercises?.length || 0;
    subtitle = `${exercisesCount} exercícios`;
  } else if (todayType === 'Crossfit') {
    subtitle = "Foco no condicionamento";
  } else {
    subtitle = "Recuperação muscular";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-4 pb-10"
    >
      <header>
        <p className="text-text-secondary text-sm mb-1">Bom dia, Yuri</p>
        <h1 className="text-2xl font-bold tracking-tight">Pronto para evoluir?</h1>
      </header>

      {/* Today's Workout Summary */}
      <section className="bg-gradient-to-br from-surface-accent to-bg border border-border-color rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
        <h2 className="text-xs font-bold text-text-secondary mb-3 uppercase tracking-widest">Treino de Hoje</h2>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
            {todayDetails.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary">{todayDetails.title}</h3>
            <p className="text-sm text-text-secondary">{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Water Tracker */}
      <section className="bg-surface border border-border-color rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-text-primary font-bold">
            <Droplets className="text-blue-400" size={20} />
            <h2>Hidratação</h2>
          </div>
          <span className="text-sm font-mono text-text-secondary">{water} / {waterGoal}ml</span>
        </div>
        
        <div className="h-3 bg-bg rounded-full overflow-hidden mb-4 border border-border-color">
          <motion.div 
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((water / waterGoal) * 100, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setWater(w => w + 250)}
            className="flex-1 bg-surface-accent hover:bg-bg border border-border-color text-text-primary py-2 rounded-xl text-sm font-medium transition-colors"
          >
            +250ml
          </button>
          <button 
            onClick={() => setWater(w => w + 500)}
            className="flex-1 bg-surface-accent hover:bg-bg border border-border-color text-text-primary py-2 rounded-xl text-sm font-medium transition-colors"
          >
            +500ml
          </button>
        </div>
      </section>

      {/* Daily Habits */}
      <section className="bg-surface border border-border-color rounded-2xl p-5">
        <h2 className="font-bold text-text-primary mb-4">Hábitos Diários</h2>
        <button 
          onClick={() => setCreatineTaken(!creatineTaken)}
          className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${creatineTaken ? 'bg-accent/10 border-accent' : 'bg-surface-accent border-border-color'}`}
        >
          <span className={`font-medium ${creatineTaken ? 'text-accent' : 'text-text-primary'}`}>Creatina (5g)</span>
          {creatineTaken ? <CheckCircle2 className="text-accent" size={24} /> : <Circle className="text-text-secondary" size={24} />}
        </button>
      </section>
    </motion.div>
  );
}
