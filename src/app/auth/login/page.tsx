'use client';

import { useActionState } from 'react';
import { login } from '@/app/actions/auth';
import { Ship, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [state, action, isPending] = useActionState(login, null);

    return (
        <div className="min-h-screen w-full flex bg-[#f8fafc]">
            {/* Left side - Hero / Branding (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#0f172a] relative overflow-hidden flex-col justify-between p-12 text-white">
                <div className="z-10">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                        <Ship size={28} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">Freight CRM</h1>
                    <p className="text-blue-200 text-lg">نظام إدارة الشحن والخدمات اللوجستية المتكامل.</p>
                </div>

                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

                <div className="z-10 space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <p className="text-lg leading-relaxed">"أداة رائعة ساعدتنا في تنظيم طلبات الأسعار ومتابعة الشحنات بشكل احترافي. وفرنا 30% من الوقت المستغرق في المراسلات."</p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">A</div>
                            <div>
                                <p className="font-semibold">AHMED ALI</p>
                                <p className="text-sm text-blue-200">Logistics Manager</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-slate-400">© 2026 Freight CRM System. All rights reserved.</p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-right">
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">تسجيل الدخول</h2>
                        <p className="text-gray-500 mt-2">مرحباً بعودتك! الرجاء إدخال بيانات حسابك للمتابعة.</p>
                    </div>

                    <form action={action} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">اسم المستخدم</label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                                placeholder="أدخل اسم المستخدم"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">كلمة المرور</label>
                                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">نسيت كلمة المرور؟</a>
                            </div>
                            <input
                                name="password"
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                                placeholder="••••••••"
                            />
                        </div>

                        {state?.message && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
                                <span>⚠️</span>
                                {state.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isPending ? <Loader2 className="animate-spin" size={20} /> : <><span>تسجيل الدخول</span> <ArrowRight size={18} /></>}
                        </button>
                    </form>

                    <div className="text-center text-sm text-gray-500">
                        ليس لديك حساب؟ <span className="text-blue-600 font-medium cursor-pointer hover:underline">تواصل مع الإدارة</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
