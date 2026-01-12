'use client';

import { submitPublicQuote } from '@/app/actions/portal';
import { useActionState } from 'react';
import { Loader2, Send } from 'lucide-react';

export default function QuoteSubmissionForm({ token }: { token: string }) {
    const [state, action, isPending] = useActionState(submitPublicQuote.bind(null, token), null);

    return (
        <form action={action} className="space-y-6">
            {state?.message && !state.success && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100 flex items-center gap-2">
                    ⚠️ {state.message}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">السعر (Price) *</label>
                    <div className="flex gap-2">
                        <input name="price" type="number" step="0.01" required className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="0.00" />
                        <select name="currency" className="w-24 px-2 py-3 rounded-xl border border-gray-200 bg-gray-50 text-center font-medium">
                            <option value="USD">USD</option>
                            <option value="EGP">EGP</option>
                            <option value="EUR">EUR</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Transit Time (مدة الرحلة)</label>
                    <input name="transitTime" type="text" placeholder="مثال: 25 يوم" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Free Days (أيام السماح)</label>
                    <input name="freeDays" type="number" defaultValue="21" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">صلاحية العرض (Validity)</label>
                    <input name="validity" type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ملاحظات إضافية</label>
                    <textarea name="notes" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" placeholder="مثال: الأسعار شاملة THC..."></textarea>
                </div>
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 text-lg"
            >
                {isPending ? <Loader2 className="animate-spin" size={24} /> : <><Send size={20} /> إرسال العرض</>}
            </button>
        </form>
    );
}
