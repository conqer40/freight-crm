'use client';

import { logout } from '@/app/actions/auth';
import { LogOut, User, Bell } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { Languages } from 'lucide-react';
import Notifications from '@/components/layout/Notifications';

export default function Header() {
    const { t, toggleLanguage, language } = useLanguage();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm backdrop-blur-md bg-opacity-90">
            <div className="text-gray-500 md:hidden">
                {/* Mobile Menu Trigger would go here */}
                ☰
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
                {/* Language Toggle */}
                <button
                    onClick={toggleLanguage}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition text-sm font-medium"
                >
                    <Languages size={16} />
                    <span>{language === 'ar' ? 'English' : 'عربي'}</span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                <Notifications />

                <div className="h-8 w-px bg-gray-200 mx-2"></div>
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium text-gray-900">المسؤول</div>
                        <div className="text-xs text-gray-500">Admin</div>
                    </div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
                        <User size={20} />
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    title="تسجيل خروج"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    );
}
