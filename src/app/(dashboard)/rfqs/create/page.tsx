'use client';

import { createRFQ } from '@/app/actions/rfq';
import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PORTS_LIST } from '@/lib/constants';
import MagicScanner from '@/components/tools/MagicScanner';
import { toast } from 'sonner';

export default function CreateRFQPage() {
    const [state, action, isPending] = useActionState(createRFQ, null);
    const router = useRouter();

    // Auto-fill State
    const [scannedData, setScannedData] = useState<any>(null);

    const handleScanComplete = (data: any) => {
        setScannedData(data);
        toast.success('تم استخراج البيانات بنجاح! 🪄', {
            description: 'تم ملء النموذج بالبيانات المستخرجة من الملف.'
        });
    };

    useEffect(() => {
        if (state?.redirectId) {
            router.push(`/rfqs/${state.redirectId}`);
        }
    }, [state, router]);

    return (
        <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-6 text-gray-400">
                <Link href="/rfqs" className="hover:text-white transition flex items-center gap-1">
                    <ArrowRight size={16} />
                    الطلبات
                </Link>
                <span>/</span>
                <span className="text-white font-semibold">إنشاء طلب تسعير جديد</span>
            </div>

            {/* Magic Scanner Section */}
            <div className="mb-8">
                <MagicScanner onScanComplete={handleScanComplete} />
            </div>

            <div className="glass-card p-8 border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    تفاصيل الشحنة
                </h2>

                <form action={action} className="space-y-8">
                    {/* Section 1: Basic Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">معلومات أساسية</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-bold text-slate-300 mb-2">عنوان الطلب * (للإشارة إليه لاحقاً)</label>
                                <input
                                    name="title"
                                    type="text"
                                    required
                                    className="w-full"
                                    placeholder="مثال: شحنة سيراميك - يناير 2026 - الصين إلى السخنة"
                                    defaultValue={scannedData?.title || ''}
                                    key={scannedData ? `title-${scannedData.title}` : 'title'}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">نوع الشحن</label>
                                <select name="mode" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-2.5">
                                    <option value="ocean">شحن بحري (Ocean)</option>
                                    <option value="air">شحن جوي (Air)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">طبيعة البضاعة (Commodity)</label>
                                <input
                                    name="commodity"
                                    type="text"
                                    className="w-full"
                                    placeholder="مثال: Ceramic Tiles"
                                    defaultValue={scannedData?.commodity || ''}
                                    key={scannedData ? `comm-${scannedData.commodity}` : 'comm'}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Route */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">المسار والتواريخ</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">ميناء الشحن (POL) *</label>
                                {scannedData?.pol ? (
                                    <input
                                        name="pol"
                                        type="text"
                                        className="w-full bg-green-500/10 border-green-500/50 text-green-400"
                                        defaultValue={scannedData.pol}
                                        readOnly
                                    />
                                ) : (
                                    <select name="pol" required className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-2.5">
                                        <option value="">اختر الميناء...</option>
                                        {PORTS_LIST.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">ميناء الوصول (POD) *</label>
                                {scannedData?.pod ? (
                                    <input
                                        name="pod"
                                        type="text"
                                        className="w-full bg-green-500/10 border-green-500/50 text-green-400"
                                        defaultValue={scannedData.pod}
                                        readOnly
                                    />
                                ) : (
                                    <select name="pod" required className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-2.5">
                                        <option value="">اختر الميناء...</option>
                                        {PORTS_LIST.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">تاريخ الشحن المتوقع (Target ETD)</label>
                                <input name="targetDate" type="date" className="w-full" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Cargo Details */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">تفاصيل الحاوية / الوزن</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">نوع الحاوية (للبحري)</label>
                                <select name="containerType" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-2.5">
                                    <option value="20DC">20' DC</option>
                                    <option value="40DC">40' DC</option>
                                    <option value="40HC">40' HC</option>
                                    <option value="20RF">20' Reefer</option>
                                    <option value="40RF">40' Reefer</option>
                                    <option value="kq">LCL (مشترك)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">عدد الحاويات</label>
                                <input
                                    name="containerCount"
                                    type="number"
                                    defaultValue={scannedData?.containerCount || "1"}
                                    key={scannedData ? `count-${scannedData.containerCount}` : 'count'}
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">وزن الحاوية / الوزن الإجمالي (KG)</label>
                                <div className="flex items-center gap-2">
                                    <input
                                        name="weight"
                                        type="number"
                                        step="0.1"
                                        className="w-full"
                                        placeholder="مثال: 18000"
                                        defaultValue={scannedData?.weight || ''}
                                        key={scannedData ? `w-${scannedData.weight}` : 'w'}
                                    />
                                    <span className="text-slate-500">KG</span>
                                </div>
                                <p className="text-xs text-slate-400 mt-1">الوزن الإجمالي للشحنة أو متوسط وزن الحاوية</p>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Terms */}
                    <div>
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">الشروط</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">Free Days المطلوبة</label>
                                <input name="freeDays" type="number" defaultValue="21" className="w-full" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">Incoterm</label>
                                <select name="incoterm" className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl p-2.5">
                                    <option value="FOB">FOB (Free On Board)</option>
                                    <option value="EXW">EXW (Ex Works)</option>
                                    <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                                    <option value="CFR">CFR (Cost and Freight)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {state?.message && (
                        <div className="bg-red-500/20 text-red-400 border border-red-500/50 p-4 rounded-xl text-sm">
                            {state.message}
                        </div>
                    )}

                    <div className="pt-6 border-t border-white/10 flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 font-bold shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
                        >
                            {isPending ? 'جاري الإنشاء...' : 'إنشاء الطلب ومتابعة'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
