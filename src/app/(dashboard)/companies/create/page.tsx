'use client';

import { createCompany } from '@/app/actions/company';
import { useActionState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CreateCompanyPage() {
    const [state, action, isPending] = useActionState(createCompany, null);

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-6 text-gray-500">
                <Link href="/companies" className="hover:text-gray-900 transition flex items-center gap-1">
                    <ArrowRight size={16} />
                    الشركات
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">إضافة شركة جديدة</span>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-6">بيانات الشركة</h2>

                <form action={action} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">اسم الشركة *</label>
                            <input name="name" type="text" required className="w-full border p-2 rounded-lg" placeholder="مثال: Maersk Egypt" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">نوع الشركة</label>
                            <select name="type" className="w-full border p-2 rounded-lg bg-white">
                                <option value="freight_forwarder">مرحل بضائع (Forwarder)</option>
                                <option value="shipping_line">خط ملاحي (Shipping Line)</option>
                                <option value="customs">مخلص جمركي</option>
                                <option value="trucking">نقل بري</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">رقم الواتساب *</label>
                            <input name="whatsapp" type="text" required className="w-full border p-2 rounded-lg" placeholder="مثال: 201000000000" />
                            <p className="text-xs text-gray-400 mt-1">بدون علامة + أو مسافات (مثال: 201xxxxxxxxx)</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">الشخص المسؤول (Contact)</label>
                            <input name="contact" type="text" className="w-full border p-2 rounded-lg" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                            <input name="email" type="email" className="w-full border p-2 rounded-lg" />
                        </div>

                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">الخدمات المقدمة</label>
                            <div className="flex gap-4 flex-wrap">
                                {['ocean:شحن بحري', 'air:شحن جوي', 'inland:نقل داخلي', 'customs:تخليص جمركي'].map(svc => {
                                    const [val, label] = svc.split(':');
                                    return (
                                        <label key={val} className="flex items-center gap-2 cursor-pointer bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
                                            <input type="checkbox" name="services" value={val} className="w-4 h-4 text-blue-600 rounded" />
                                            <span className="text-sm">{label}</span>
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {state?.message && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                            {state.message}
                        </div>
                    )}

                    <div className="pt-4 border-t flex justify-end">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPending ? 'جاري الحفظ...' : 'حفظ الشركة'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
