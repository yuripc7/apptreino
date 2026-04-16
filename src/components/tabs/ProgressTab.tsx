import { motion } from 'motion/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowDownRight, ArrowUpRight, Minus, Camera, Trash2, Download } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const evolutionData = [
  { date: 'Anterior', peso: 89.4, bf: 27.8 },
  { date: 'Atual', peso: 87.15, bf: 26.9 }
];

export function ProgressTab() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('yurifit_photos');
    if (savedPhotos) setPhotos(JSON.parse(savedPhotos));
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos, reader.result as string];
        setPhotos(newPhotos);
        localStorage.setItem('yurifit_photos', JSON.stringify(newPhotos));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    localStorage.setItem('yurifit_photos', JSON.stringify(newPhotos));
  };

  const exportToHTML = () => {
    const prs = JSON.parse(localStorage.getItem('yurifit_prs') || '{}');
    
    const prsHtml = Object.entries(prs).map(([movement, weight]) => 
      `<tr><td>${movement}</td><td><strong>${weight} kg</strong></td></tr>`
    ).join('');

    const photosHtml = photos.map(photo => 
      `<div class="photo-card"><img src="${photo}" alt="Evolução" /></div>`
    ).join('');

    const htmlContent = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Evolução Híbrida</title>
    <style>
        :root {
            --bg: #0A0A0B;
            --surface: #151517;
            --accent: #CCFF00;
            --text-primary: #FFFFFF;
            --text-secondary: #8E8E93;
            --border: #1C1C1E;
        }
        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text-primary);
            margin: 0;
            padding: 20px;
            line-height: 1.6;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
        h1, h2, h3 { color: var(--accent); }
        .card {
            background-color: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        th, td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid var(--border);
        }
        th { color: var(--text-secondary); font-weight: normal; }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .photo-card img {
            width: 100%;
            border-radius: 8px;
            border: 1px solid var(--border);
            object-fit: cover;
            aspect-ratio: 3/4;
        }
        .text-secondary { color: var(--text-secondary); }
    </style>
</head>
<body>
    <div class="container">
        <h1>Relatório de Evolução Híbrida</h1>
        <p class="text-secondary">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>

        <div class="card">
            <h2>CrossFit PRs (Cargas Máximas)</h2>
            ${prsHtml ? `<table><thead><tr><th>Movimento</th><th>Carga</th></tr></thead><tbody>${prsHtml}</tbody></table>` : '<p class="text-secondary">Nenhum PR registrado.</p>'}
        </div>

        <div class="card">
            <h2>Galeria de Evolução</h2>
            ${photosHtml ? `<div class="gallery">${photosHtml}</div>` : '<p class="text-secondary">Nenhuma foto registrada.</p>'}
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `evolucao-hibrida-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pt-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Evolução</h1>
          <p className="text-text-secondary text-sm">Comparativo de Composição Corporal</p>
        </div>
        <button 
          onClick={exportToHTML}
          className="bg-accent/10 text-accent hover:bg-accent/20 p-2 rounded-xl transition-colors"
          title="Exportar para HTML"
        >
          <Download size={20} />
        </button>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard 
          label="Peso Total" 
          value="87.15" 
          unit="kg" 
          diff="-2.25" 
          trend="down" 
          good={true} 
        />
        <StatCard 
          label="Gordura Corporal" 
          value="26.9" 
          unit="%" 
          diff="-0.9" 
          trend="down" 
          good={true} 
        />
        <StatCard 
          label="Massa Muscular" 
          value="33.6" 
          unit="kg" 
          diff="-0.3" 
          trend="down" 
          good={false} // Small loss, but expected in cutting
        />
        <StatCard 
          label="Gordura Visceral" 
          value="13.5" 
          unit="" 
          diff="-1.0" 
          trend="down" 
          good={true} 
        />
      </div>

      {/* Chart */}
      <section className="bg-surface border border-border-color rounded-2xl p-5">
        <h3 className="font-semibold text-text-primary mb-6">Curva de Peso (kg)</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-color)" vertical={false} />
              <XAxis dataKey="date" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis domain={['dataMin - 1', 'dataMax + 1']} stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} width={30} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-surface-accent)', borderColor: 'var(--color-border-color)', borderRadius: '0.5rem', color: 'var(--color-text-primary)' }}
                itemStyle={{ color: 'var(--color-accent)' }}
              />
              <Line 
                type="monotone" 
                dataKey="peso" 
                stroke="var(--color-accent)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Analysis */}
      <section className="bg-surface-accent border-l-4 border-l-accent rounded-lg p-5">
        <h3 className="font-semibold text-text-primary mb-4">Análise da Evolução:</h3>
        <div className="space-y-4 text-sm text-[#D1D1D6] leading-relaxed">
          <p>
            Processo de cutting excelente. Perda de 1,4kg de gordura pura detectada. A queda de massa muscular (0,3kg) é mínima para o déficit calórico atual. Sinal positivo para estímulo de musculação e CrossFit.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-surface border border-border-color rounded-2xl p-5 overflow-x-auto">
        <table className="w-full text-[13px] text-left border-collapse">
          <thead>
            <tr>
              <th className="text-text-secondary font-normal pb-3 border-b border-border-color">Métrica</th>
              <th className="text-text-secondary font-normal pb-3 border-b border-border-color">Anterior (89,4kg)</th>
              <th className="text-text-secondary font-normal pb-3 border-b border-border-color">Atual (87,15kg)</th>
              <th className="text-text-secondary font-normal pb-3 border-b border-border-color">Variação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 border-b border-border-color">Massa Musc. Esquelética</td>
              <td className="py-3 border-b border-border-color">33,9 kg</td>
              <td className="py-3 border-b border-border-color font-semibold text-accent">33,6 kg</td>
              <td className="py-3 border-b border-border-color">-0,3 kg</td>
            </tr>
            <tr>
              <td className="py-3 border-b border-border-color">Massa Muscular Total</td>
              <td className="py-3 border-b border-border-color">61,9 kg</td>
              <td className="py-3 border-b border-border-color font-semibold text-accent">61,1 kg</td>
              <td className="py-3 border-b border-border-color">-0,8 kg</td>
            </tr>
            <tr>
              <td className="py-3 border-b border-border-color">Água Corporal</td>
              <td className="py-3 border-b border-border-color">46,6 kg (52,1%)</td>
              <td className="py-3 border-b border-border-color font-semibold text-accent">45,7 kg (52,5%)</td>
              <td className="py-3 border-b border-border-color text-accent">+0,4% rel.</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Evolution Gallery */}
      <section className="bg-surface border border-border-color rounded-2xl p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-text-primary">Galeria de Evolução</h3>
          <label className="bg-accent/10 text-accent hover:bg-accent/20 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-2">
            <Camera size={14} />
            <span>Adicionar Foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
        
        {photos.length === 0 ? (
          <div className="border-2 border-dashed border-border-color rounded-xl p-8 flex flex-col items-center justify-center text-text-secondary">
            <Camera size={32} className="mb-2 opacity-50" />
            <p className="text-sm text-center">Nenhuma foto adicionada ainda.<br/>Acompanhe sua evolução visual!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo, idx) => (
              <div key={idx} className="relative group aspect-[3/4] rounded-xl overflow-hidden border border-border-color">
                <img src={photo} alt={`Evolução ${idx + 1}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => removePhoto(idx)}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-rose-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}

function StatCard({ label, value, unit, diff, trend, good }: { label: string, value: string, unit: string, diff: string, trend: 'up' | 'down' | 'flat', good: boolean }) {
  return (
    <div className="bg-surface-accent border border-border-color rounded-xl p-4 flex flex-col">
      <span className="text-text-secondary text-xs font-medium mb-2">{label}</span>
      <div className="flex items-end gap-1 mb-1">
        <span className="text-2xl font-bold text-text-primary font-mono">{value}</span>
        <span className="text-text-secondary text-sm mb-0.5">{unit}</span>
      </div>
      <div className={`flex items-center gap-1 text-xs font-medium text-accent`}>
        {trend === 'down' ? <ArrowDownRight size={14} /> : trend === 'up' ? <ArrowUpRight size={14} /> : <Minus size={14} />}
        <span>{diff} {unit}</span>
      </div>
    </div>
  );
}
