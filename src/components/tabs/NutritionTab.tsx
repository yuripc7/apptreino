import { motion } from 'motion/react';
import { Flame, Beef, Wheat, Droplet } from 'lucide-react';
import { ReactNode } from 'react';

export function NutritionTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Nutricao</h1>
        <p className="text-text-secondary text-sm">Acompanhamento diario (Cutting)</p>
      </header>

      <section className="bg-surface border border-border-color rounded-2xl p-5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-text-secondary text-xs font-bold uppercase tracking-widest">Calorias Consumidas</h2>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-bold text-text-primary font-mono">1,850</span>
              <span className="text-text-secondary text-sm">/ 2,200 kcal</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Flame size={24} /></div>
        </div>
        <div className="space-y-4">
          <MacroBar icon={<Beef size={16} />} label="Proteina" current={140} target={180} color="bg-accent" unit="g" />
          <MacroBar icon={<Wheat size={16} />} label="Carboidratos" current={120} target={150} color="bg-accent" unit="g" />
          <MacroBar icon={<Droplet size={16} />} label="Gorduras" current={55} target={70} color="bg-accent" unit="g" />
        </div>
      </section>

      <section className="bg-surface border border-border-color rounded-2xl p-5">
        <h3 className="font-semibold text-text-primary mb-4">Refeicoes de Hoje</h3>
        <div className="space-y-4">
          <MealItem time="08:00" name="Cafe da Manha" cals={450} />
          <MealItem time="12:30" name="Almoco" cals={650} />
          <MealItem time="16:00" name="Pre-treino" cals={300} />
          <MealItem time="20:00" name="Jantar" cals={450} />
        </div>
      </section>
    </motion.div>
  );
}

function MacroBar({ icon, label, current, target, color, unit }: { icon: ReactNode, label: string, current: number, target: number, color: string, unit: string }) {
  const percentage = Math.min((current/target)*100, 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center gap-1.5 text-text-secondary text-sm"><span>{icon}</span><span>{label}</span></div>
        <div className="text-sm font-mono"><span className="font-medium text-text-primary">{current}</span><span className="text-text-secondary"> / {target}{unit}</span></div>
      </div>
      <div className="h-1 w-full bg-border-color rounded-full overflow-hidden">
        <motion.div className={`h-full ${color} rounded-full`} initial={{ width: 0 }} animate={{ width: percentage+'%' }} transition={{ duration: 0.5, ease: 'easeOut' }} />
      </div>
    </div>
  );
}

function MealItem({ time, name, cals }: { time: string, name: string, cals: number }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-color last:border-0 last:pb-0">
      <div className="flex items-center gap-3"><span className="text-xs font-mono text-text-secondary">{time}</span><span className="text-sm font-medium text-text-primary">{name}</span></div>
      <span className="text-sm text-text-secondary font-mono">{cals} kcal</span>
    </div>
  );
}
