'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ship, FileText, BadgeDollarSign, Building2, BarChart3, Settings, User, LogOut, BoxSelect } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

const linkKeys = [
    { href: '/', key: 'dashboard', icon: LayoutDashboard },
    { href: '/companies', key: 'companies', icon: Building2 },
    { href: '/rfqs', key: 'rfqs', icon: FileText },
    { href: '/quotes', key: 'quotes', icon: BadgeDollarSign },
    { href: '/shipments', key: 'shipments', icon: Ship },
    { href: '/reports', key: 'reports', icon: BarChart3 },
    { href: '/users', key: 'users', icon: User },
    { href: '/settings', key: 'settings', icon: Settings },
    { href: '/tools/cargo-planner', key: 'cargo_planner', icon: BoxSelect },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    return (
        <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 p-4 z-50">
            {/* Glass Container */}
            <div className="flex-1 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden relative">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

                {/* Header */}
                <div className="p-6 pb-2">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 ring-1 ring-white/10">
                            <Ship size={28} className="text-white fill-white/20" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-white leading-tight">Elhawy<span className="text-blue-400">Freight</span></h1>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold opacity-70">Logistics OS</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                    {linkKeys.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative",
                                    isActive
                                        ? "bg-blue-600/10 text-white shadow-inner shadow-blue-500/5 ring-1 ring-blue-500/20"
                                        : "hover:bg-white/5 text-slate-400 hover:text-white"
                                )}
                            >
                                {/* Active Indicator Glow */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_12px_rgba(59,130,246,0.5)]"></div>
                                )}

                                <Icon size={22} className={cn(
                                    "transition-all duration-300",
                                    isActive ? "text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" : "text-slate-500 group-hover:text-slate-300"
                                )} />

                                <span className={cn(
                                    "font-medium tracking-wide transition-all",
                                    isActive ? "text-white" : "group-hover:translate-x-1"
                                )}>
                                    {(t as any)[link.key]}
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Profile */}
                <div className="p-4 mt-auto">
                    <div className="p-3.5 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-md group hover:bg-white/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center ring-2 ring-white/10 group-hover:ring-blue-500/50 transition-all">
                                <User size={18} className="text-slate-300" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate">Elhawy Admin</p>
                                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    v2.5 (Live Fixed) 🟢
                                </p>
                            </div>
                            <Settings size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
