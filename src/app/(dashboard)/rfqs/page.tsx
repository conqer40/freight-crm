import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Plus, Ship, Plane, Eye, Sparkles } from 'lucide-react';
import { format } from 'date-fns';

export default async function RFQsPage() {
    const rfqs = await prisma.rFQ.findMany({
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { targetCompanies: true, quotes: true } } }
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 text-glow inline-block">طلبات الأسعار (RFQs)</h2>
                    <p className="text-slate-400 mt-1">إدارة ومتابعة طلبات الشحن</p>
                </div>
                <div className="flex gap-3">
                    <Link
                        href="/rfqs/create"
                        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all border border-white/10 group"
                    >
                        <Sparkles size={18} className="group-hover:animate-spin" />
                        <span className="font-bold">جرب الماسح السحري ✨</span>
                    </Link>

                    <Link
                        href="/rfqs/create"
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>إنشاء طلب جديد</span>
                    </Link>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="premium-table text-right">
                    <thead>
                        <tr>
                            <th>العنوان</th>
                            <th>المسار</th>
                            <th>التفاصيل</th>
                            <th>الحالة</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rfqs.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                            <Ship size={32} className="text-slate-600" />
                                        </div>
                                        <p>لا توجد طلبات حالياً.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {rfqs.map((rfq) => (
                            <tr key={rfq.id} className="group">
                                <td>
                                    <div className="font-bold text-white text-lg">{rfq.title}</div>
                                    <div className="text-xs text-slate-400 mt-1 font-mono">
                                        {format(rfq.createdAt, 'yyyy-MM-dd')}
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <span className="font-bold text-white">{rfq.pol}</span>
                                        <span className="text-slate-500">→</span>
                                        <span className="font-bold text-white">{rfq.pod}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col gap-2">
                                        <div className={`flex items-center gap-1 text-xs w-fit px-2 py-1 rounded border ${rfq.mode === 'ocean' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                                            {rfq.mode === 'ocean' ? <Ship size={12} /> : <Plane size={12} />}
                                            <span>{rfq.mode === 'ocean' ? 'بحري' : 'جوي'}</span>
                                        </div>
                                        <div className="text-xs text-slate-400">
                                            {rfq.mode === 'ocean' ? `${rfq.containerCount}x${rfq.containerType}` : `${rfq.weight} KG`}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <StatusBadge status={rfq.status} />
                                    <div className="text-[10px] text-slate-500 mt-1">
                                        {rfq._count.targetCompanies} شركة مستهدفة / <span className="text-white font-bold">{rfq._count.quotes}</span> رد
                                    </div>
                                </td>
                                <td>
                                    <Link href={`/rfqs/${rfq.id}`} className="text-blue-400 hover:text-white hover:bg-blue-500/20 p-2 rounded-lg inline-block transition-all">
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
        'DRAFT': 'bg-slate-700 text-slate-300 border-slate-600',
        'SENT': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
        'QUOTES_RECEIVED': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
        'AWARDED': 'bg-green-500/10 text-green-400 border-green-500/20',
        'CLOSED': 'bg-red-500/10 text-red-400 border-red-500/20',
    };
    const labels: any = {
        'DRAFT': 'مسودة',
        'SENT': 'تم الإرسال',
        'QUOTES_RECEIVED': 'وصلت عروض',
        'AWARDED': 'تم الترسية',
        'CLOSED': 'مغلق'
    };
    return (
        <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${styles[status] || styles['DRAFT']}`}>
            {labels[status] || status}
        </span>
    );
}
