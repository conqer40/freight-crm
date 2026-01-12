'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingDown, TrendingUp, AlertTriangle, Sparkles, BrainCircuit } from 'lucide-react';
import { useState } from 'react';



export default function RatePredictor({ historicalRates }: { historicalRates?: any[] }) {
    const defaultData = [
        { name: 'Week 1', rate: 2400 },
        { name: 'Week 2', rate: 2350 },
        { name: 'Week 3', rate: 2500 },
        { name: 'Current', rate: 2900 },
    ];

    // Combine real data with AI projection if available, otherwise use default
    const displayData = historicalRates && historicalRates.length > 0
        ? [
            ...historicalRates,
            // Projected future (mocked AI logic based on last trend)
            { name: 'Next Week', rate: historicalRates[historicalRates.length - 1].rate * 0.95, prediction: true },
            { name: 'Week +2', rate: historicalRates[historicalRates.length - 1].rate * 0.92, prediction: true }
        ]
        : defaultData;

    const [route, setRoute] = useState('Shanghai -> Sokhna');

    return (
        <div className="glass-card p-6 relative overflow-hidden group">
            {/* AI Badge */}
            <div className="absolute top-0 left-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white px-3 py-1 rounded-br-xl text-xs font-bold flex items-center gap-1 z-10 shadow-lg shadow-purple-500/20">
                <BrainCircuit size={14} />
                Elhawy AI Core
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 mt-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        بورصة الشحن (AI Rate Predictor) 📉
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">توقعات الأسعار للأسبوع القادم بناءً على تحليل السوق</p>
                </div>

                <div className="flex bg-slate-800/50 rounded-lg p-1 border border-white/5 mt-2 md:mt-0">
                    <button
                        onClick={() => setRoute('Shanghai -> Sokhna')}
                        className={`px-3 py-1 text-xs rounded transition-all ${route === 'Shanghai -> Sokhna' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Shanghai ➝ Sokhna
                    </button>
                    <button
                        onClick={() => setRoute('Ningbo -> Alexa')}
                        className={`px-3 py-1 text-xs rounded transition-all ${route === 'Ningbo -> Alexa' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                    >
                        Ningbo ➝ Alexa
                    </button>
                </div>
            </div>

            {/* Recommendation Card */}
            <div className="flex items-center gap-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 backdrop-blur-sm">
                <div className="bg-emerald-500/20 p-3 rounded-full animate-pulse">
                    <TrendingDown size={24} className="text-emerald-400" />
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-bold text-lg">نوصي بالانتظار! (Wait)</span>
                        <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">High Confidence 94%</span>
                    </div>
                    <p className="text-slate-300 text-sm mt-1">
                        الذكاء الاصطناعي يتوقع <span className="text-white font-bold">انخفاض</span> الأسعار بقيمة <span className="text-white font-bold">$600</span> خلال 10 أيام. لا تحجز الآن.
                    </p>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={displayData}>
                        <defs>
                            <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                        <YAxis stroke="#94a3b8" fontSize={11} domain={[2000, 3200]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#475569', color: '#fff' }}
                            itemStyle={{ color: '#c084fc' }}
                        />
                        <ReferenceLine x="Current" stroke="#ef4444" strokeDasharray="3 3" label={{ position: 'top', value: 'Now', fill: 'red', fontSize: 10 }} />
                        <Area
                            type="monotone"
                            dataKey="rate"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRate)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <p className="text-right text-[10px] text-slate-500 mt-2 flex items-center justify-end gap-1">
                <Sparkles size={10} />
                Powered by Elhawy Deep Learning Model v1.0
            </p>
        </div>
    );
}
