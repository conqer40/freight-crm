import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Ship, Plane, Eye } from 'lucide-react';
import { format } from 'date-fns';

export default async function RFQsPage() {
    const rfqs = await prisma.rFQ.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { targetCompanies: true, quotes: true } } }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">طلبات الأسعار (RFQs)</h2>
                <Link
                    href="/rfqs/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    <span>إنشاء طلب جديد</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4 font-medium">العنوان</th>
                            <th className="p-4 font-medium">المسار</th>
                            <th className="p-4 font-medium">التفاصيل</th>
                            <th className="p-4 font-medium">الحالة</th>
                            <th className="p-4 font-medium">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {rfqs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400">
                                    لا توجد طلبات حالياً.
                                </td>
                            </tr>
                        )}
                        {rfqs.map((rfq) => (
                            <tr key={rfq.id} className="hover:bg-gray-50 transition">
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">{rfq.title}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        {format(rfq.createdAt, 'yyyy-MM-dd')}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="font-medium">{rfq.pol}</span>
                                        <span className="text-gray-400">→</span>
                                        <span className="font-medium">{rfq.pod}</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1 text-xs bg-slate-100 w-fit px-2 py-1 rounded">
                                            {rfq.mode === 'ocean' ? <Ship size={12} className="text-blue-600" /> : <Plane size={12} className="text-orange-600" />}
                                            <span>{rfq.mode === 'ocean' ? 'بحري' : 'جوي'}</span>
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {rfq.mode === 'ocean' ? `${rfq.containerCount}x${rfq.containerType}` : `${rfq.weight} KG`}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <StatusBadge status={rfq.status} />
                                    <div className="text-[10px] text-gray-400 mt-1">
                                        {rfq._count.targetCompanies} شركة مستهدفة / {rfq._count.quotes} رد
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Link href={`/rfqs/${rfq.id}`} className="text-blue-600 hover:bg-blue-50 p-2 rounded-full inline-block">
                                        <Eye size={20} />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        'DRAFT': 'bg-gray-100 text-gray-600',
        'SENT': 'bg-blue-50 text-blue-700',
        'AWARDED': 'bg-green-50 text-green-700',
        'CLOSED': 'bg-red-50 text-red-700',
    };
    const labels: any = {
        'DRAFT': 'مسودة',
        'SENT': 'تم الإرسال',
        'AWARDED': 'تم الترسية',
        'CLOSED': 'مغلق'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles['DRAFT']}`}>
            {labels[status] || status}
        </span>
    );
}
