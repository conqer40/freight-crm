'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Ship, FileText, BadgeDollarSign, Building2, BarChart3, Settings, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

// Move links definition inside component or keep keys outside
const linkKeys = [
    { href: '/', key: 'dashboard', icon: LayoutDashboard },
    { href: '/companies', key: 'companies', icon: Building2 },
    { href: '/rfqs', key: 'rfqs', icon: FileText },
    { href: '/quotes', key: 'quotes', icon: BadgeDollarSign },
    { href: '/shipments', key: 'shipments', icon: Ship },
    { href: '/reports', key: 'reports', icon: BarChart3 },
    { href: '/users', key: 'users', icon: User },
    { href: '/settings', key: 'settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();

    return (
        <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col h-screen sticky top-0 shadow-xl">
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <Ship size={24} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-white">{t.dashboard}</h1>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Freight & Logistics</p>
                    </div>
                </div>
            </div>
            <nav className="flex-1 px-3 space-y-1 mt-6">
                {linkKeys.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25"
                                    : "hover:bg-white/5 text-slate-400 hover:text-white"
                            )}
                        >
                            {isActive && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
                            <Icon size={20} className={cn("transition-colors relative z-10", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                            <span className="font-medium relative z-10">{(t as any)[link.key]}</span>
                            {isActive && <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-sm"></div>}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 m-3 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Settings size={16} />
                    </div>
                    <div>
                        <p className="text-xs font-medium text-slate-300">نسخة تجريبية</p>
                        <p className="text-[10px] text-slate-500">v1.0.0 Beta</p>
                    </div>
                </div>
            </div>
        </aside>
    );
}
