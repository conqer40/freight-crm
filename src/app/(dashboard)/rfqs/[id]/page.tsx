import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import TargetCompanies from '@/components/rfq/TargetCompanies';
import QuotesList from '@/components/rfq/QuotesList';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function RFQDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const rfq = await prisma.rFQ.findUnique({
        where: { id },
        include: {
            quotes: { include: { company: true } },
            targetCompanies: true
        }
    });

    if (!rfq) notFound();

    const allCompanies = await prisma.company.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-2 text-gray-500">
                <Link href="/rfqs" className="hover:text-gray-900 transition flex items-center gap-1">
                    <ArrowRight size={16} />
                    الطلبات
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">{rfq.title}</span>
            </div>

            {/* Header */}
            <div className="flex justify-between items-start bg-white p-6 rounded-xl border shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{rfq.title}</h2>
                    <div className="flex gap-2 mt-2">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-sm text-gray-600">{rfq.status}</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm">{rfq.mode}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Details Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Details Grid */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">تفاصيل الشحنة</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-8">
                            <Detail label="مسار الشحن" value={`${rfq.pol} ➝ ${rfq.pod}`} full />
                            <Detail label="نوع الشحن" value={rfq.mode} />
                            <Detail label="البضاعة" value={rfq.commodity} />
                            <Detail label="Incoterm" value={rfq.incoterm} />
                            <Detail label="Free Days" value={`${rfq.freeDays} Days`} />
                            <Detail label="الحاوية" value={rfq.containerType || '-'} />
                            <Detail label="العدد" value={rfq.containerCount || '-'} />
                            <Detail label="الوزن" value={rfq.weight ? `${rfq.weight} KG` : '-'} />
                            <Detail label="تاريخ الإنشاء" value={format(rfq.createdAt, 'yyyy-MM-dd')} />
                        </div>
                    </div>

                    {/* Target Companies Section */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4 pb-2 border-b">1. اختيار الشركات وإرسال واتساب</h3>
                        <TargetCompanies rfq={rfq} allCompanies={allCompanies} />
                    </div>

                    {/* Quotes Section */}
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <div className="flex justify-between items-center mb-4 pb-2 border-b">
                            <h3 className="font-semibold text-gray-900">2. عروض الأسعار المسجلة</h3>
                        </div>
                        <QuotesList rfq={rfq} companies={allCompanies} />
                    </div>
                </div>

                {/* Sidebar Stats / Actions (Optional) */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border shadow-sm">
                        <h3 className="font-semibold mb-4 text-sm text-gray-500 uppercase">ملخص</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">شركات مستهدفة</span>
                                <span className="font-bold">{rfq.targetCompanies.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">عروض مستلمة</span>
                                <span className="font-bold">{rfq.quotes.length}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Detail({ label, value, full }: any) {
    return (
        <div className={full ? 'col-span-2' : ''}>
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="font-medium text-gray-900">{value}</div>
        </div>
    )
}
