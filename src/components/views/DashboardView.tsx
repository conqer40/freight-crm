'use client';

import { useLanguage } from '@/lib/i18n';
import { Building2, FileText, BadgeDollarSign, Ship, Clock, TrendingUp, AlertCircle, ArrowUpRight } from 'lucide-react';

export default function DashboardView({ stats }: { stats: any }) {
    const { t } = useLanguage();

    const cards = [
        { title: t.companies, value: stats.companiesCount, icon: Building2, color: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/20' },
        { title: t.active_rfqs, value: stats.activeRfqs, icon: FileText, color: 'from-orange-500 to-red-500', shadow: 'shadow-orange-500/20' },
        { title: t.pending_quotes, value: stats.pendingQuotes, icon: BadgeDollarSign, color: 'from-purple-500 to-indigo-600', shadow: 'shadow-purple-500/20' },
        { title: t.active_shipments, value: stats.activeShipments, icon: Ship, color: 'from-emerald-500 to-green-600', shadow: 'shadow-emerald-500/20' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">{t.welcome} 👋</h2>
                    <p className="text-gray-500 mt-2 text-lg">{t.overview}</p>
                </div>
                <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-purple-500/20 transition-all border border-purple-400/30">
                    <TrendingUp size={16} />
                    <span>AI Insights: Bullish Market 🚀</span>
                </button>
                <div className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/10">
                    <Clock size={16} />
                    <span>{new Date().toLocaleDateString('en-GB')}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <div key={i} className={`bg-white p-6 rounded-2xl border border-gray-100 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg ${card.shadow}`}>
                                    <card.icon size={24} />
                                </div>
                                <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
                            </div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{card.title}</p>
                            <h3 className="text-3xl font-bold text-gray-900">{card.value}</h3>
                        </div>
                        {/* Decorative background blob */}
                        <div className={`absolute -right-4 -bottom-4 w-32 h-32 rounded-full opacity-[0.03] bg-gradient-to-br ${card.color} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-gray-900">{t.recent_activity}</h3>
                            <p className="text-sm text-gray-400 mt-1">آخر التحديثات في النظام</p>
                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition">
                            <ArrowUpRight size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <TrendingUp size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">{t.no_data}</p>
                        <p className="text-sm text-gray-400 mt-1">لم يتم تسجيل أي نشاطات حديثة بعد</p>
                    </div>
                </div>

                {/* Upcoming Shipments Card */}
                <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-gray-900">{t.upcoming_shipments}</h3>
                            <p className="text-sm text-gray-400 mt-1">الشحنات المجدولة لهذا الأسبوع</p>
                        </div>
                        <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition">
                            <ArrowUpRight size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                            <Ship size={32} />
                        </div>
                        <p className="text-gray-500 font-medium">{t.no_data}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
