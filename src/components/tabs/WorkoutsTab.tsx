import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, PlayCircle, Trophy } from 'lucide-react';
import { WorkoutType, defaultDayTypes, dayNames, gymRoutines, getWorkoutDetails } from '../../lib/workouts';

export function WorkoutsTab() {
  const [expandedDay, setExpandedDay] = useState<number | null>(new Date().getDay());
  const currentDay = new Date().getDay();
  const [dayTypes, setDayTypes] = useState<Record<number, WorkoutType>>(defaultDayTypes);
  const [wods, setWods] = useState<Record<number, string>>({});
  const [weights, setWeights] = useState<Record<string, string>>({});
  const [prs, setPrs] = useState<Record<string, string>>({});

  useEffect(() => {
    const s = localStorage.getItem('yurifit_dayTypes'); if (s) setDayTypes(JSON.parse(s));
    const w = localStorage.getItem('yurifit_wods'); if (w) setWods(JSON.parse(w));
    const wt = localStorage.getItem('yurifit_weights'); if (wt) setWeights(JSON.parse(wt));
    const p = localStorage.getItem('yurifit_prs'); if (p) setPrs(JSON.parse(p));
  }, []);

  const handleTypeChange = (dayId: number, type: WorkoutType) => {
    const n = { ...dayTypes, [dayId]: type }; setDayTypes(n); localStorage.setItem('yurifit_dayTypes', JSON.stringify(n));
  };
  const handleWodChange = (dayId: number, text: string) => {
    const n = { ...wods, [dayId]: text }; setWods(n); localStorage.setItem('yurifit_wods', JSON.stringify(n));
  };
  const handleWeightChange = (key: string, value: string) => {
    const n = { ...weights, [key]: value }; setWeights(n); localStorage.setItem('yurifit_weights', JSON.stringify(n));
  };
  const handlePrChange = (key: string, value: string) => {
    const n = { ...prs, [key]: value }; setPrs(n); localStorage.setItem('yurifit_prs', JSON.stringify(n));
  };

  const crossfitMovements = ['Snatch','Clean & Jerk','Deadlift','Back Squat','Front Squat','Overhead Squat','Bench Press','Strict Press'];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 pb-10">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Sua Semana</h1>
        <p className="text-text-secondary text-sm">Treinamento Hibrido: Cross + Gym</p>
      </header>

      <div className="space-y-3">
        {[0,1,2,3,4,5,6].map((dayId) => {
          const isToday = dayId === currentDay;
          const isExpanded = expandedDay === dayId;
          const dayType = dayTypes[dayId];
          const details = getWorkoutDetails(dayId, dayType);
          const gymExercises = gymRoutines[dayId]?.exercises || [];
          return (
            <div key={dayId} className={`rounded-2xl border overflow-hidden transition-all duration-300 ${isToday ? 'bg-gradient-to-br from-surface-accent to-bg border-accent shadow-[0_0_15px_rgba(204,255,0,0.1)]' : 'bg-surface border-border-color opacity-80'}`}>
              <div onClick={() => setExpandedDay(isExpanded ? null : dayId)} className={`p-4 cursor-pointer flex items-center justify-between ${!isToday && 'bg-surface'}`}>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-surface-accent rounded-xl w-12 h-12 flex items-center justify-center border border-border-color">{details.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-text-primary">{dayNames[dayId]}</span>
                      {isToday && <span className="text-[10px] bg-accent text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">Hoje</span>}
                    </div>
                    <span className="text-sm text-text-secondary">{details.title}</span>
                  </div>
                </div>
                {isExpanded ? <ChevronUp className="text-text-secondary" size={20}/> : <ChevronDown className="text-text-secondary" size={20}/>}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-surface-accent">
                    <div className="px-4 pb-5 pt-4 border-t border-border-color">
                      <div className="flex bg-bg rounded-lg p-1 mb-5 border border-border-color">
                        <button onClick={() => handleTypeChange(dayId,'Crossfit')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${dayType==='Crossfit'?'bg-accent text-black':'text-text-secondary hover:text-text-primary'}`}>CrossFit</button>
                        <button onClick={() => handleTypeChange(dayId,'Gym')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${dayType==='Gym'?'bg-accent text-black':'text-text-secondary hover:text-text-primary'}`}>Academia</button>
                        <button onClick={() => handleTypeChange(dayId,'Rest')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${dayType==='Rest'?'bg-accent text-black':'text-text-secondary hover:text-text-primary'}`}>Descanso</button>
                      </div>
                      {dayType==='Crossfit' && (
                        <div className="space-y-2">
                          <label className="text-xs text-text-secondary font-medium">Anotacoes do WOD:</label>
                          <textarea value={wods[dayId]||''} onChange={(e)=>handleWodChange(dayId,e.target.value)} placeholder="Anote o WOD aqui (ex: AMRAP 12 min...)" className="w-full bg-bg border border-border-color rounded-xl p-3 text-sm text-text-primary focus:outline-none focus:border-accent min-h-[120px] resize-none"/>
                        </div>
                      )}
                      {dayType==='Gym' && gymExercises.length > 0 && (
                        <ul className="space-y-4">
                          {gymExercises.map((ex: any, idx: number) => {
                            const weightKey = dayId+'-'+idx;
                            return (
                              <li key={idx} className="bg-bg border border-border-color rounded-xl p-3">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-bold text-text-primary text-sm">{ex.name}</h4>
                                    <p className="text-xs text-text-secondary mt-0.5">{ex.sets} series x {ex.reps}</p>
                                  </div>
                                  {ex.video && <a href={ex.video} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white transition-colors flex items-center gap-1 bg-accent/10 px-2 py-1 rounded text-xs font-medium"><PlayCircle size={14}/><span>Video</span></a>}
                                </div>
                                {ex.obs && <p className="text-xs text-text-secondary mb-3 bg-surface p-2 rounded border border-border-color"><span className="text-accent font-bold">Obs:</span> {ex.obs}</p>}
                                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-color">
                                  <label className="text-xs text-text-secondary font-medium">Carga (kg):</label>
                                  <input type="number" placeholder="0" value={weights[weightKey]||''} onChange={(e)=>handleWeightChange(weightKey,e.target.value)} className="w-16 bg-surface border border-border-color rounded px-2 py-1 text-xs text-text-primary text-center focus:outline-none focus:border-accent"/>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                      {dayType==='Gym' && gymExercises.length===0 && <p className="text-sm text-text-secondary text-center py-4">Nenhum treino cadastrado para este dia.</p>}
                      {dayType==='Rest' && <div className="py-6 text-center"><p className="text-sm text-text-secondary">Dia de descanso. Aproveite para recuperar!</p></div>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <section className="mt-8 bg-surface border border-border-color rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-accent" size={20}/>
          <h2 className="font-bold text-text-primary">CrossFit PRs (Cargas Maximas)</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {crossfitMovements.map((movement) => (
            <div key={movement} className="bg-surface-accent border border-border-color rounded-xl p-3 flex flex-col">
              <span className="text-xs text-text-secondary font-medium mb-2">{movement}</span>
              <div className="flex items-center gap-2 mt-auto">
                <input type="number" placeholder="0" value={prs[movement]||''} onChange={(e)=>handlePrChange(movement,e.target.value)} className="w-full bg-bg border border-border-color rounded px-2 py-1.5 text-sm text-text-primary font-mono focus:outline-none focus:border-accent"/>
                <span className="text-xs text-text-secondary">kg</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
