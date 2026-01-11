'use client';

import { createRFQ } from '@/app/actions/rfq';
import { useActionState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PORTS_LIST } from '@/lib/constants';

export default function CreateRFQPage() {
    const [state, action, isPending] = useActionState(createRFQ, null);
    const router = useRouter();

    useEffect(() => {
        if (state?.redirectId) {
            router.push(`/rfqs/${state.redirectId}`);
        }
    }, [state, router]);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-500">
                <Link href="/rfqs" className="hover:text-gray-900 transition flex items-center gap-1">
                    <ArrowRight size={16} />
                    الطلبات
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">إنشاء طلب تسعير جديد</span>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">تفاصيل الشحنة</h2>

                <form action={action} className="space-y-8">
                    {/* Section 1: Basic Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">معلومات أساسية</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الطلب * (للإشارة إليه لاحقاً)</label>
                                <input name="title" type="text" required className="w-full border p-2 rounded-lg" placeholder="مثال: شحنة سيراميك - يناير 2026 - الصين إلى السخنة" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الشحن</label>
                                <select name="mode" className="w-full border p-2 rounded-lg bg-white">
                                    <option value="ocean">شحن بحري (Ocean)</option>
                                    <option value="air">شحن جوي (Air)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">طبيعة البضاعة (Commodity)</label>
                                <input name="commodity" type="text" className="w-full border p-2 rounded-lg" placeholder="مثال: Ceramic Tiles" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Route */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">المسار والتواريخ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">ميناء الشحن (POL) *</label>
                                <select name="pol" required className="w-full border p-2 rounded-lg bg-white">
                                    <option value="">اختر الميناء...</option>
                                    {PORTS_LIST.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">ميناء الوصول (POD) *</label>
                                <select name="pod" required className="w-full border p-2 rounded-lg bg-white">
                                    <option value="">اختر الميناء...</option>
                                    {PORTS_LIST.map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الشحن المتوقع (Target ETD)</label>
                                <input name="targetDate" type="date" className="w-full border p-2 rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Cargo Details */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">تفاصيل الحاوية / الوزن</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">نوع الحاوية (للبحري)</label>
                                <select name="containerType" className="w-full border p-2 rounded-lg bg-white">
                                    <option value="20DC">20' DC</option>
                                    <option value="40DC">40' DC</option>
                                    <option value="40HC">40' HC</option>
                                    <option value="20RF">20' Reefer</option>
                                    <option value="40RF">40' Reefer</option>
                                    <option value="kq">LCL (مشترك)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">عدد الحاويات</label>
                                <input name="containerCount" type="number" defaultValue="1" className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">وزن الحاوية / الوزن الإجمالي (KG)</label>
                                <div className="flex items-center gap-2">
                                    <input name="weight" type="number" step="0.1" className="w-full border p-2 rounded-lg" placeholder="مثال: 18000" />
                                    <span className="text-gray-500">KG</span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">الوزن الإجمالي للشحنة أو متوسط وزن الحاوية</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Terms */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">الشروط</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Free Days المطلوبة</label>
                                <input name="freeDays" type="number" defaultValue="21" className="w-full border p-2 rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Incoterm</label>
                                <select name="incoterm" className="w-full border p-2 rounded-lg bg-white">
                                    <option value="FOB">FOB (Free On Board)</option>
                                    <option value="EXW">EXW (Ex Works)</option>
                                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                                    <option value="CFR">CFR (Cost and Freight)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {state?.message && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                            {state.message}
                        </div>
                    )}

                    <div className="pt-6 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium"
                        >
                            {isPending ? 'جاري الإنشاء...' : 'إنشاء الطلب ومتابعة'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
