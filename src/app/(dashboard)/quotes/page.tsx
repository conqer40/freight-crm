import prisma from '@/lib/prisma';
import Link from 'next/link';
import { BadgeDollarSign, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

export default async function QuotesPage() {
    const quotes = await prisma.quote.findMany({
        include: {
            company: true,
            rfq: true
        },
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">كل عروض الأسعار (Quotes)</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4 font-medium">الشركة</th>
                            <th className="p-4 font-medium">السعر</th>
                            <th className="p-4 font-medium">الطلب (RFQ)</th>
                            <th className="p-4 font-medium">Free Days</th>
                            <th className="p-4 font-medium">الحالة</th>
                            <th className="p-4 font-medium">التاريخ</th>
                            <th className="p-4 font-medium"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {quotes.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400">
                                    لا توجد عروض أسعار مسجلة حتى الآن.
                                </td>
                            </tr>
                        )}
                        {quotes.map((quote) => (
                            <tr key={quote.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-medium text-gray-900">{quote.company.name}</td>
                                <td className="p-4 font-bold text-blue-600">{quote.price} {quote.currency}</td>
                                <td className="p-4 text-sm text-gray-600 max-w-[200px] truncate" title={quote.rfq.title}>
                                    {quote.rfq.title}
                                </td>
                                <td className="p-4 text-sm">{quote.freeDays} يوم</td>
                                <td className="p-4">
                                    <StatusBadge status={quote.status} />
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    {format(quote.createdAt, 'yyyy-MM-dd')}
                                </td>
                                <td className="p-4">
                                    <Link href={`/rfqs/${quote.rfqId}`} className="text-gray-400 hover:text-blue-600 flex items-center gap-1 text-xs">
                                        <ExternalLink size={14} /> عرض الطلب
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
        'RECEIVED': 'bg-gray-100 text-gray-600',
        'WINNER': 'bg-green-50 text-green-700',
        'REJECTED': 'bg-red-50 text-red-700',
    };
    const labels: any = {
        'RECEIVED': 'وارد',
        'WINNER': 'فائز',
        'REJECTED': 'مرفوض'
    };
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles['RECEIVED']}`}>
            {labels[status] || status}
        </span>
    );
}
