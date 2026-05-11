import { useState, ReactNode } from 'react';
import { Home, Dumbbell, Apple, TrendingUp } from 'lucide-react';
import { HomeTab } from './components/tabs/HomeTab';
import { WorkoutsTab } from './components/tabs/WorkoutsTab';
import { NutritionTab } from './components/tabs/NutritionTab';
import { ProgressTab } from './components/tabs/ProgressTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-bg text-text-primary font-sans pb-20 selection:bg-accent/30">
      <main className="max-w-md mx-auto p-4 md:p-6">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'workouts' && <WorkoutsTab />}
        {activeTab === 'nutrition' && <NutritionTab />}
        {activeTab === 'progress' && <ProgressTab />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-border-color z-50">
        <div className="max-w-md mx-auto flex justify-around items-center p-3">
          <NavItem icon={<Home size={24} />} label="Inicio" isActive={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Dumbbell size={24} />} label="Treinos" isActive={activeTab === 'workouts'} onClick={() => setActiveTab('workouts')} />
          <NavItem icon={<Apple size={24} />} label="Nutricao" isActive={activeTab === 'nutrition'} onClick={() => setActiveTab('nutrition')} />
          <NavItem icon={<TrendingUp size={24} />} label="Evolucao" isActive={activeTab === 'progress'} onClick={() => setActiveTab('progress')} />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: { icon: ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
        isActive ? 'text-accent scale-110' : 'text-text-secondary hover:text-text-primary'
      }`}
    >
      {icon}
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
