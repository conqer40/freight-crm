'use client';

import { useState } from 'react';
import { Send, CheckSquare, Square, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function TargetCompanies({ rfq, allCompanies }: { rfq: any, allCompanies: any[] }) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // Filter companies that match mode if needed, or just show all
    const filteredCompanies = allCompanies.filter(c =>
        rfq.mode === 'ocean' ? (c.type === 'freight_forwarder' || c.type === 'shipping_line') : true
    );

    const toggleSelect = (id: string) => {
        if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(x => x !== id));
        else setSelectedIds([...selectedIds, id]);
    };

    const selectAll = () => {
        if (selectedIds.length === filteredCompanies.length) setSelectedIds([]);
        else setSelectedIds(filteredCompanies.map(c => c.id));
    };

    const generateMessage = () => {
        return `السلام عليكم،
محتاج عرض سعر للشحنة التالية:
• النوع: ${rfq.mode === 'ocean' ? 'بحري' : 'جوي'}
• المسار: ${rfq.pol} → ${rfq.pod}
• المنتج: ${rfq.commodity}
• الحاوية: ${rfq.containerCount || 1}x ${rfq.containerType || '-'}
• الوزن: ${rfq.weight || '-'}
• Free Days: ${rfq.freeDays} يوم
• Incoterm: ${rfq.incoterm}

يرجى إرسال أفضل سعر مع تفاصيل (Freight, THC, Docs, etc.) وصلاحية العرض.`;
    };

    const sendWhatsApp = async (companyId: string, phone: string) => {
        const { getOrCreateQuoteLink } = await import('@/app/actions/portal');

        toast.promise(async () => {
            const res = await getOrCreateQuoteLink(rfq.id, companyId);
            if (!res.success) throw new Error(res.message);

            const msg = encodeURIComponent(`${generateMessage()}\n\nرابط تقديم العرض: ${res.url}`);
            window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        }, {
            loading: 'جاري إنشاء رابط التسعير...',
            success: 'تم فتح واتساب',
            error: 'حدث خطأ'
        });
    };

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                <button onClick={selectAll} className="text-sm text-blue-600 font-medium hover:underline">
                    {selectedIds.length === filteredCompanies.length ? 'إلغاء التحديد' : 'تحديد الكل'}
                </button>
                <span className="text-sm text-gray-500">تم تحديد {selectedIds.length} شركة</span>

                <button
                    onClick={() => {
                        navigator.clipboard.writeText(generateMessage());
                        toast.success('تم نسخ نص الرسالة (بدون رابط)');
                    }}
                    className="text-gray-500 hover:text-gray-900 border px-3 py-1 rounded text-sm flex items-center gap-2"
                >
                    <Copy size={14} /> نسخ
                </button>
            </div>

            <div className="border rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                {filteredCompanies.map(company => (
                    <div key={company.id} className={`flex items-center justify-between p-3 border-b last:border-0 hover:bg-gray-50 ${selectedIds.includes(company.id) ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-center gap-3">
                            <button onClick={() => toggleSelect(company.id)} className="text-blue-600">
                                {selectedIds.includes(company.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                            </button>
                            <div>
                                <div className="font-medium">{company.name}</div>
                                <div className="text-xs text-gray-500">{company.type}</div>
                            </div>
                        </div>

                        {company.whatsapp && (
                            <button
                                onClick={() => sendWhatsApp(company.id, company.whatsapp)}
                                className="bg-green-500 text-white px-3 py-1 rounded shadow-sm text-sm hover:bg-green-600 flex items-center gap-1"
                            >
                                <Send size={14} /> إرسال
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
