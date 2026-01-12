import prisma from '@/lib/prisma';
import { Ship, Eye, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import ShipmentActions from '@/components/shipment/ShipmentActions';

export default async function ShipmentsPage() {
    const shipments = await prisma.shipment.findMany({
        include: { rfq: true, company: true },
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">الشحنات (Shipments)</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4 font-medium">Ref No.</th>
                            <th className="p-4 font-medium">المسار</th>
                            <th className="p-4 font-medium">الشركة</th>
                            <th className="p-4 font-medium">البضاعة</th>
                            <th className="p-4 font-medium">الحالة</th>
                            <th className="p-4 font-medium">التواريخ</th>
                            <th className="p-4 font-medium">إجراءات</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {shipments.length === 0 && (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-gray-400">
                                    لا توجد شحنات نشطة حالياً.
                                    <br />
                                    <span className="text-xs text-gray-400">يمكنك إنشاء شحنة عن طريق قبول عرض سعر في قائمة الطلبات.</span>
                                </td>
                            </tr>
                        )}
                        {shipments.map((shipment) => (
                            <tr key={shipment.id} className="hover:bg-gray-50 transition">
                                <td className="p-4 font-mono text-sm font-semibold text-blue-600">
                                    <Link href={`/shipments/${shipment.id}`}>
                                        {shipment.bookingNo || 'Draft'}
                                    </Link>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <span>{shipment.rfq.pol}</span>
                                        <span className="text-gray-400">→</span>
                                        <span>{shipment.rfq.pod}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm font-medium">{shipment.company?.name || '-'}</td>
                                <td className="p-4 text-sm">{shipment.rfq.commodity}</td>
                                <td className="p-4">
                                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-100">
                                        {shipment.status}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={12} />
                                        {format(shipment.createdAt, 'yyyy-MM-dd')}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <Link href={`/shipments/${shipment.id}`} className="text-gray-400 hover:text-blue-600 transition">
                                        <Eye size={20} />
                                    </Link>
                                    <ShipmentActions id={shipment.id} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
