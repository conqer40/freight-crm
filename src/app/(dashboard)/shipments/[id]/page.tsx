import prisma from '@/lib/prisma';
import ShipmentEditForm from '@/components/shipment/ShipmentEditForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default async function ShipmentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const shipment = await prisma.shipment.findUnique({
        where: { id },
        include: { rfq: true, company: true }
    });

    if (!shipment) notFound();

    const companies = await prisma.company.findMany({
        orderBy: { name: 'asc' }
    });

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-gray-500">
                <Link href="/shipments" className="hover:text-gray-900 transition flex items-center gap-1">
                    <ArrowRight size={16} />
                    الشحنات
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">{shipment.bookingNo || 'New Shipment'}</span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">تفاصيل الشحنة (Shipment Details)</h1>
                    <p className="text-gray-500">Ref: {shipment.id}</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-500">RFQ Reference</div>
                    <Link href={`/rfqs/${shipment.rfqId}`} className="text-blue-600 font-medium hover:underline">
                        {shipment.rfq.title}
                    </Link>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-8 text-sm text-blue-800">
                <div>
                    <span className="block text-blue-400 text-xs uppercase mb-1">المسار Route</span>
                    <span className="font-bold text-lg">{shipment.rfq.pol} ➝ {shipment.rfq.pod}</span>
                </div>
                <div>
                    <span className="block text-blue-400 text-xs uppercase mb-1">البضاعة Commodity</span>
                    <span className="font-bold text-lg">{shipment.rfq.commodity}</span>
                </div>
            </div>

            <ShipmentEditForm shipment={shipment} companies={companies} />
        </div>
    );
}
