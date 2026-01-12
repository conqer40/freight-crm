'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const data = [
    { name: 'يناير', shipments: 4 },
    { name: 'فبراير', shipments: 7 },
    { name: 'مارس', shipments: 5 },
    { name: 'أبريل', shipments: 12 },
    { name: 'مايو', shipments: 9 },
    { name: 'يونيو', shipments: 15 },
];

const pieData = [
    { name: 'بحري (Ocean)', value: 75, color: '#3b82f6' },
    { name: 'جوي (Air)', value: 25, color: '#06b6d4' },
];

export default function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Shipment Trend Chart */}
            <div className="lg:col-span-2 glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">إحصائيات الشحن (Shipment Trends)</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorShipments" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="shipments" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorShipments)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Mode Distribution Chart */}
            <div className="glass-card p-6">
                <h3 className="text-lg font-bold text-white mb-6">أنواع الشحن (Mode)</h3>
                <div className="h-[300px] w-full flex flex-col items-center justify-center relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', color: '#f8fafc' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">100%</p>
                            <p className="text-xs text-slate-400">Total Volume</p>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center gap-2 text-xs text-slate-300">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
