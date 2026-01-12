'use client';

import { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, Calendar, Filter, Zap } from 'lucide-react';

interface RateData {
    date: string;
    price: number;
    route: string;
    mode: string;
}

export default function RatePredictor({ historicalRates }: { historicalRates: RateData[] }) {
    const [selectedRoute, setSelectedRoute] = useState<string>('All');
    const [showForecast, setShowForecast] = useState(false);

    // 1. Extract Unique Routes
    const uniqueRoutes = useMemo(() => {
        const routes = new Set(historicalRates.map(r => r.route));
        return ['All', ...Array.from(routes)];
    }, [historicalRates]);

    // 2. Filter & Aggregate Data
    const chartData = useMemo(() => {
        let filtered = historicalRates;
        if (selectedRoute !== 'All') {
            filtered = historicalRates.filter(r => r.route === selectedRoute);
        }

        // Group by Date (Average price per day)
        const grouped: Record<string, { date: string, price: number, count: number }> = {};
        filtered.forEach(r => {
            if (!grouped[r.date]) {
                grouped[r.date] = { date: r.date, price: 0, count: 0 };
            }
            grouped[r.date].price += r.price;
            grouped[r.date].count += 1;
        });

        const data = Object.values(grouped).map(g => ({
            date: g.date.slice(5), // MM-DD
            price: Math.round(g.price / g.count),
            market: Math.round((g.price / g.count) * (1 + (Math.random() * 0.1 - 0.05))) // Simulated Market Index +/- 5%
        })).sort((a, b) => a.date.localeCompare(b.date));

        // Generate Forecast if enabled
        if (showForecast && data.length > 0) {
            const lastPrice = data[data.length - 1].price;
            const trend = lastPrice > data[0]?.price ? 1 : -1;

            for (let i = 1; i <= 5; i++) {
                data.push({
                    date: `Future +${i}`,
                    price: Math.round(lastPrice * (1 + (i * 0.02 * trend))),
                    market: Math.round(lastPrice * (1 + (i * 0.02 * trend)) * 1.05)
                });
            }
        }

        return data; // Return empty if no data, handled in UI
    }, [historicalRates, selectedRoute, showForecast]);

    // 3. Analysis Text
    const currentTrend = chartData.length > 1 && chartData[chartData.length - 1].price < chartData[chartData.length - 2].price ? 'down' : 'up';
    const advice = currentTrend === 'down'
        ? "Rates are dropping! Wait a few days to book."
        : "Rates are spikng! Book immediately to lock price.";

    return (
        <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                <TrendingUp size={100} className="text-emerald-500" />
            </div>

            <div className="flex items-center justify-between mb-6 z-10">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                        <Zap size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">AI Rate Predictor ⚡</h2>
                        <p className="text-xs text-slate-400">Freight Market Intelligence</p>
                    </div>
                </div>

                <div className="flex bg-slate-800 rounded-lg p-1">
                    <button
                        onClick={() => setShowForecast(false)}
                        className={`px-3 py-1 text-xs rounded-md transition ${!showForecast ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        History
                    </button>
                    <button
                        onClick={() => setShowForecast(true)}
                        className={`px-3 py-1 text-xs rounded-md transition ${showForecast ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                    >
                        Forecast 🔮
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 mb-4 z-10">
                <Filter size={14} className="text-slate-500" />
                <select
                    value={selectedRoute}
                    onChange={e => setSelectedRoute(e.target.value)}
                    className="bg-slate-800 text-white text-xs border border-slate-700 rounded px-2 py-1 outline-none focus:border-blue-500"
                >
                    {uniqueRoutes.map(r => <option key={r} value={r}>{r}</option>)}
                </select>

                {chartData.length > 0 && (
                    <span className={`text-xs px-2 py-0.5 rounded ml-auto flex items-center gap-1 ${currentTrend === 'down' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {currentTrend === 'down' ? <TrendingDown size={12} /> : <TrendingUp size={12} />}
                        {currentTrend === 'down' ? 'Market Cooling' : 'Market Heating'}
                    </span>
                )}
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[200px] w-full z-10">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                            <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} width={30} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fill="url(#colorPrice)" name="My Rates" />
                            {showForecast && <Area type="monotone" dataKey="market" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorMarket)" name="Predicted Market" />}
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
                        <AlertCircle size={32} />
                        <p className="text-sm">Not enough data to predict yet.</p>
                        <p className="text-xs">Add more quotes to unlock AI insights.</p>
                    </div>
                )}
            </div>

            {/* AI Advice */}
            {chartData.length > 0 && (
                <div className="mt-4 p-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-lg z-10">
                    <h4 className="text-xs font-bold text-blue-300 uppercase mb-1 flex items-center gap-1">
                        <Zap size={10} /> AI Recommendation
                    </h4>
                    <p className="text-sm text-white font-medium italic">"{advice}"</p>
                </div>
            )}
        </div>
    );
}
