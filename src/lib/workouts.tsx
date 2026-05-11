import { Calendar, Dumbbell, Zap } from 'lucide-react';
import { ReactNode } from 'react';

export type WorkoutType = 'Gym' | 'Crossfit' | 'Rest';

export const defaultDayTypes: Record<number, WorkoutType> = {
  0: 'Rest',
  1: 'Crossfit',
  2: 'Gym',
  3: 'Crossfit',
  4: 'Gym',
  5: 'Crossfit',
  6: 'Gym'
};

export const dayNames: Record<number, string> = {
  0: 'Domingo', 1: 'Segunda', 2: 'Terca', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sabado'
};

export const gymRoutines: Record<number, any> = {
  1: {
    title: 'Membros Inferiores',
    exercises: [
      { name: 'Back extension', sets: '3', reps: '12', video: 'https://www.youtube.com/watch?v=d5HsfHVyH7c' },
      { name: 'Avanco', sets: '3', reps: '10 Cada lado', obs: 'Se estiver leve, utilize halteres' },
      { name: 'Romenian Deadlift', sets: '3', reps: '8', video: 'https://www.youtube.com/watch?v=7j-2w4-P14I' },
      { name: 'Cadeira extensora', sets: '3', reps: 'Ate a falha', obs: 'Busque a falha entre 8 a 12 reps' },
      { name: 'Leg 45 Uni Lateral', sets: '3', reps: '12 cada lado', obs: 'Carga moderada' }
    ]
  },
  2: {
    title: 'Peito, Ombro e Triceps',
    exercises: [
      { name: 'Manguito Externo', sets: '3', reps: '10 Cada lado', video: 'https://www.youtube.com/watch?v=oElBNT5bjhA' },
      { name: 'Desenvolvimento Sentado', sets: '3', reps: '10 a 12', video: 'https://www.youtube.com/watch?v=IDOZyXHq7aI' },
      { name: 'Supino Reto Barra', sets: '3', reps: '12', video: 'https://www.youtube.com/watch?v=vIGvt-vgrvY' },
      { name: 'Supino Inclinado Barra', sets: '3', reps: '12' },
      { name: 'Triceps corda + Triceps banco', sets: '3', reps: '10+10', video: 'https://www.youtube.com/watch?v=KhK5HWJfsrQ' }
    ]
  },
  3: {
    title: 'Costas, Biceps e Ombro',
    exercises: [
      { name: 'Rosca Martelo', sets: '3', reps: '8', video: 'https://www.youtube.com/shorts/CTTsTVZM3Uk' },
      { name: 'Puxada Alta aberta', sets: '4', reps: '8 a 10', video: 'https://www.youtube.com/watch?v=mPmfwbc_svw' },
      { name: 'Remada baixa aberta', sets: '3', reps: '8 a 10', video: 'https://www.youtube.com/watch?v=hYuhnv9B-Gk' },
      { name: 'Remada alta', sets: '3', reps: '12', video: 'https://www.youtube.com/shorts/Yn80M-tsQAk' },
      { name: 'Elevacao Lateral', sets: '3', reps: '10', video: 'https://www.youtube.com/shorts/UJ0dtSxmaRI' }
    ]
  },
  4: {
    title: 'Core e Cardio',
    exercises: [
      { name: 'Flexao tocando os pes', sets: '3', reps: '12', video: 'https://www.youtube.com/watch?v=3KowrvjkwHg' },
      { name: 'Abdominal Remador', sets: '4', reps: '20', video: 'https://www.youtube.com/shorts/HUTMiOoMK2I' },
      { name: 'Pull down', sets: '4', reps: '12', video: 'https://www.youtube.com/shorts/AP3f0k07lkI' },
      { name: 'Bike', sets: '1', reps: '15 min', obs: 'Utilize um peso bom na bicicleta e mantenha o pedal sem parar por 15 min' },
      { name: 'V-up unilateral', sets: '3', reps: '12 cada lado', video: 'https://www.youtube.com/shorts/UP-BDR3Qj6E' }
    ]
  },
  5: {
    title: 'Bracos Completos',
    exercises: [
      { name: 'Rosca Alternada', sets: '3', reps: '8 a 10 cada lado', video: 'https://www.youtube.com/shorts/xXp3mV3OOZo' },
      { name: 'Triceps Corda', sets: '3', reps: 'Ate a falha', video: 'https://www.youtube.com/shorts/-QGC1cL6ETE' },
      { name: 'Rosca Scott', sets: '3', reps: '10', video: 'https://www.youtube.com/shorts/QkNciumGy14' },
      { name: 'Triceps Frances', sets: '3', reps: '8 a 10', video: 'https://www.youtube.com/shorts/dMYGgTbtRIQ' },
      { name: 'Rosca Punho', sets: '3', reps: '10 Cada lado', video: 'https://www.youtube.com/shorts/9xz3Ty-VY1c' }
    ]
  },
  6: { title: 'Cardio', exercises: [{ name: 'Corrida leve', sets: '1', reps: '30 min' }] },
  0: { title: 'Descanso', exercises: [] }
};

export const getWorkoutDetails = (dayId: number, type: WorkoutType) => {
  if (type === 'Crossfit') {
    return { title: 'WOD - CrossFit', icon: <Zap className="text-accent" size={20} /> };
  } else if (type === 'Gym') {
    return { title: gymRoutines[dayId]?.title || 'Academia', icon: <Dumbbell className="text-accent" size={20} /> };
  } else {
    return { title: 'Descanso Total', icon: <Calendar className="text-text-secondary" size={20} /> };
  }
};
