import prisma from '@/lib/prisma';
import ShipmentEditForm from '@/components/shipment/ShipmentEditForm';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ShipmentActions from '@/components/shipment/ShipmentActions';

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
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="flex items-center gap-3">
                        <div className="text-sm text-slate-400">Actions</div>
                        <div className="text-sm text-slate-400">Actions</div>
                        {/* Edit Link is below */}
                        <div className="hidden"></div> {/* Temp fix for Import, see below */}
                        {/* We will just add the import at top manually if needed, or rely on next step. 
                             Actually, let's just place the component here provided imports are correct.
                             Wait, I cannot easily add imports with replace_file_content if they are far away.
                             I will use ShipmentActions here.
                         */}
                    </div>
                    <Link href={`/rfqs/${shipment.rfqId}`} className="text-blue-500 text-sm font-medium hover:text-blue-400 transition">
                        Associated RFQ: {shipment.rfq.title}
                    </Link>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                <h2 className="text-white font-bold flex items-center gap-2">
                    <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                    إدارة الشحنة
                </h2>
                <div className="flex items-center gap-3">
                    <ShipmentActions id={shipment.id} shipment={shipment} />
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-8 text-sm text-blue-800">
                <div>
                    <span className="block text-blue-400 text-xs uppercase mb-1">المسار Route</span>
                    <span className="font-bold text-lg">{shipment.rfq.pol} ➝ {shipment.rfq.pod}</span>
                </div>
                <div>
                    <span className="font-bold text-lg">{shipment.rfq.commodity}</span>
                </div>
                {shipment.acidNumber && (
                    <div className="animate-in fade-in slide-in-from-right duration-700">
                        <span className="block text-green-400 text-xs uppercase mb-1">ACID Number 🛡️</span>
                        <span className="font-mono font-bold text-lg text-white bg-white/10 px-2 py-0.5 rounded">{shipment.acidNumber}</span>
                    </div>
                )}
            </div>

            <ShipmentEditForm shipment={shipment} companies={companies} />
        </div>
    );
}
