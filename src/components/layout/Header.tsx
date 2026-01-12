'use client';

import { logout } from '@/app/actions/auth';
import { LogOut, User, Bell, Search, Menu } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Languages } from 'lucide-react';
import Notifications from '@/components/layout/Notifications';

export default function Header() {
    const { t, toggleLanguage, language } = useLanguage();

    return (
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40">
            {/* Glass Background Container */}
            <div className="absolute inset-x-4 top-2 bottom-0 bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-lg -z-10"></div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-white transition-colors md:hidden">
                    <Menu size={24} />
                </button>

                {/* Search Bar (Visual Only for now) */}
                <div className="hidden md:flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-white/5 focus-within:border-blue-500/50 focus-within:bg-slate-800 transition-all w-64 md:w-96">
                    <Search size={18} className="text-slate-500" />
                    <input
                        type="text"
                        placeholder="بحث في الشحنات..."
                        className="bg-transparent border-none text-sm text-white placeholder-slate-500 focus:ring-0 p-0 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700 border border-white/5 transition-all text-sm font-medium"
                >
                    <Languages size={18} />
                    <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                </button>

                <div className="h-6 w-px bg-slate-700"></div>

                <Notifications />

                <div className="h-6 w-px bg-slate-700"></div>

                <div className="flex items-center gap-4 pl-2">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-bold text-white">المسؤول</div>
                        <div className="text-[10px] text-blue-400 font-semibold tracking-wider">ADMIN</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 p-[2px] shadow-lg shadow-blue-500/20">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                            <User size={20} className="text-white" />
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => logout()}
                    className="p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all"
                    title="تسجيل خروج"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}
