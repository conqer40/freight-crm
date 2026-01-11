import prisma from '@/lib/prisma';
import { BarChart3, TrendingUp, Download } from 'lucide-react';

export default async function ReportsPage() {
    const companies = await prisma.company.findMany({
        include: { _count: { select: { quotes: true, rfqs: true } } },
        orderBy: { quotes: { _count: 'desc' } },
        take: 5
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">التقارير والإحصائيات</h2>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                    <Download size={18} />
                    <span>تصدير Excel</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Most Active Companies */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp size={20} className="text-blue-600" />
                        الشركات الأكثر تفاعلاً
                    </h3>
                    <div className="space-y-4">
                        {companies.map((c, i) => (
                            <div key={c.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <div className="font-medium">{c.name}</div>
                                        <div className="text-xs text-gray-500">{c.type}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-gray-900">{c._count.quotes}</div>
                                    <div className="text-xs text-gray-500">عرض سعر</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Shipment Status Report */}
                <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <BarChart3 size={20} className="text-green-600" />
                        ملخص حالة الشحنات
                    </h3>
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed text-gray-400">
                        (مخطط بياني سيظهر هنا بعد تجميع بيانات كافية)
                    </div>
                </div>
            </div>

            {/* Detailed Reports Links */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-bold text-gray-800 mb-4">تقارير تفصيلية</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ReportCard title="تقرير الشحنات الشهرية" desc="جميع الشحنات خلال الشهر الحالي" />
                    <ReportCard title="تقرير المدفوعات والأسعار" desc="تحليل أسعار النولون حسب المسار" />
                    <ReportCard title="أداء الموردين" desc="تقييم التزام الشركات بالمواعيد" />
                </div>
            </div>
        </div>
    );
}

function ReportCard({ title, desc }: any) {
    return (
        <div className="p-4 border rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition group">
            <div className="font-semibold text-gray-900 group-hover:text-blue-700">{title}</div>
            <div className="text-sm text-gray-500 mt-1">{desc}</div>
        </div>
    )
}
