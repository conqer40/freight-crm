'use client';

import { useState } from 'react';
import { addQuote, awardQuote } from '@/app/actions/rfq';
import { Check, Plus, Trophy } from 'lucide-react';
import { toast } from 'sonner';

export default function QuotesList({ rfq, companies }: { rfq: any, companies: any[] }) {
    const [showAdd, setShowAdd] = useState(false);

    return (
        <div>
            {/* Quotes Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-right">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-3">الشركة</th>
                            <th className="p-3">السعر</th>
                            <th className="p-3">صلاحية</th>
                            <th className="p-3">ملاحظات</th>
                            <th className="p-3">الحالة</th>
                            <th className="p-3">إجراء</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {rfq.quotes.map((quote: any) => (
                            <tr key={quote.id} className={quote.status === 'WINNER' ? 'bg-green-50' : ''}>
                                <td className="p-3 font-medium">{quote.company.name}</td>
                                <td className="p-3 font-bold text-lg">{quote.price} {quote.currency}</td>
                                <td className="p-3">None</td>
                                <td className="p-3 max-w-xs truncate">{quote.notes}</td>
                                <td className="p-3">
                                    {quote.status === 'WINNER' && <span className="text-green-600 font-bold flex items-center gap-1"><Trophy size={14} /> فائز</span>}
                                </td>
                                <td className="p-3">
                                    {rfq.status !== 'AWARDED' && (
                                        <form action={async (formData: FormData) => { await awardQuote(quote.id, rfq.id); }}>
                                            <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200">
                                                ترسية
                                            </button>
                                        </form>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {rfq.quotes.length === 0 && <div className="p-4 text-center text-gray-400">لا توجد عروض أسعار مسجلة</div>}
            </div>

            {rfq.status !== 'AWARDED' && (
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="mt-4 flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-3 py-2 rounded transition"
                >
                    <Plus size={18} /> تسجيل عرض سعر جديد
                </button>
            )}

            {showAdd && (
                <div className="mt-4 bg-gray-50 p-4 rounded-lg border">
                    <AddQuoteForm rfqId={rfq.id} companies={companies} onClose={() => setShowAdd(false)} />
                </div>
            )}
        </div>
    );
}

function AddQuoteForm({ rfqId, companies, onClose }: any) {
    return (
        <form action={async (formData) => {
            const res = await addQuote(null, formData);
            if (res.success) {
                toast.success('تمت إضافة العرض');
                onClose();
            } else {
                toast.error(res.message);
            }
        }} className="grid grid-cols-2 gap-4">
            <input type="hidden" name="rfqId" value={rfqId} />

            <div className="col-span-2">
                <label className="block text-xs mb-1">الشركة</label>
                <select name="companyId" className="w-full border p-2 rounded bg-white">
                    {companies.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>

            <div>
                <label className="block text-xs mb-1">السعر</label>
                <input name="price" type="number" step="0.01" required className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block text-xs mb-1">العملة</label>
                <select name="currency" className="w-full border p-2 rounded bg-white">
                    <option value="USD">USD</option>
                    <option value="EGP">EGP</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>

            <div>
                <label className="block text-xs mb-1">Free Days</label>
                <input name="freeDays" type="number" className="w-full border p-2 rounded" />
            </div>

            <div className="col-span-2">
                <label className="block text-xs mb-1">ملاحظات</label>
                <textarea name="notes" className="w-full border p-2 rounded" rows={2}></textarea>
            </div>

            <div className="col-span-2 flex justify-end gap-2">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500">إلغاء</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ العرض</button>
            </div>
        </form>
    )
}
