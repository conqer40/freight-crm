import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Ship, Calendar, Box, Anchor } from 'lucide-react';
import QuoteSubmissionForm from '@/components/portal/QuoteSubmissionForm';

export default async function PortalPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;

    const request = await prisma.quoteRequest.findUnique({
        where: { token },
        include: {
            rfq: true,
            company: true
        }
    });

    if (!request) notFound();

    if (request.status === 'SUBMITTED') {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                        <span className="text-3xl">✅</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">تم استلام عرضكم بنجاح</h1>
                    <p className="text-gray-500">شكراً لكم، تم تسجيل عرض السعر في النظام وسيتم مراجعته قريباً.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl" dir="rtl">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/30 text-white">
                        <Ship size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">طلب عرض سعر (RFQ)</h2>
                    <p className="text-gray-500">مرحباً <span className="font-semibold text-gray-900">{request.company.name}</span>، نرجو منكم تقديم أفضل عرض للشحنة التالية.</p>
                </div>

                {/* RFQ Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
                        <div>
                            <div className="text-slate-400 text-xs uppercase font-medium mb-1">عنوان الشحنة</div>
                            <h3 className="text-xl font-bold">{request.rfq.title}</h3>
                        </div>
                        <div className="bg-white/10 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/10">
                            {request.rfq.mode === 'ocean' ? 'شحن بحري 🚢' : 'شحن جوي ✈️'}
                        </div>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <DetailItem icon={Anchor} label="المسار" value={`${request.rfq.pol} ➝ ${request.rfq.pod}`} />
                            <DetailItem icon={Box} label="البضاعة" value={request.rfq.commodity} />
                        </div>
                        <div className="space-y-6">
                            <DetailItem icon={Box} label="التفاصيل" value={`${request.rfq.containerCount || 1}x ${request.rfq.containerType || 'LCL'} (${request.rfq.weight || '-'} KG)`} />
                            <DetailItem icon={Calendar} label="تاريخ الشحن" value={request.rfq.targetDate ? new Date(request.rfq.targetDate).toLocaleDateString('en-GB') : 'ASAP'} />
                        </div>
                        <div className="col-span-1 md:col-span-2 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
                            <span className="font-bold">ملاحظات:</span> Incoterm: {request.rfq.incoterm}, Free Days Required: {request.rfq.freeDays} Days
                        </div>
                    </div>
                </div>

                {/* Submission Form */}
                <div className="bg-white rounded-2xl shadow-lg shadow-blue-900/5 border border-gray-100 p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">تقديم العرض</h3>
                    <QuoteSubmissionForm token={token} />
                </div>

                <p className="text-center text-gray-400 text-sm">Freight CRM System © 2026</p>
            </div>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }: any) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 text-blue-500">
                <Icon size={20} />
            </div>
            <div>
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="font-semibold text-gray-900">{value}</p>
            </div>
        </div>
    )
}
