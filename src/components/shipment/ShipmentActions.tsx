'use client';

import { deleteShipment } from '@/app/actions/shipment';
import { Trash2, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface ShipmentActionsProps {
    id: string;
    shipment?: any;
}

export default function ShipmentActions({ id, shipment }: ShipmentActionsProps) {

    const handleDelete = async () => {
        if (confirm('هل أنت متأكد من حذف هذه الشحنة؟ لا يمكن التراجع.')) {
            await deleteShipment(id);
            toast.success('تم حذف الشحنة بنجاح');
        }
    };

    const handleWhatsAppUpdate = () => {
        if (!shipment) return;

        // Dynamic Emoji based on status
        const statusEmoji = shipment.status === 'ARRIVED' ? '✅' : shipment.status === 'AT_SEA' ? '🌊' : '📦';

        const message = `*Shipment Update ${statusEmoji}*
        
Dear Customer,

Here is the latest status of your shipment:

🆔 *Ref:* ${shipment.bookingNo || 'Pending'}
🚢 *Vessel:* ${shipment.vessel || 'TBA'}
📍 *Status:* ${shipment.status}
📅 *ETA:* ${shipment.eta ? new Date(shipment.eta).toLocaleDateString() : 'TBA'}

View full details/docs here:
https://freight-crm-one.vercel.app/p/track/${id}

Best Regards,
*Freight CRM Team*`;

        const encodedMsg = encodeURIComponent(message);
        window.open(`https://wa.me/?text=${encodedMsg}`, '_blank');
        toast.info('Opening WhatsApp...');
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={handleWhatsAppUpdate}
                className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors flex items-center gap-2"
                title="إرسال تحديث للعميل واتساب"
            >
                <div className="bg-green-500/20 p-1.5 rounded-full">
                    <MessageCircle size={18} />
                </div>
                <span className="text-xs font-bold hidden sm:inline text-green-400">تحديث العميل</span>
            </button>

            <button
                onClick={handleDelete}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                title="حذف الشحنة"
            >
                <Trash2 size={20} />
            </button>
        </div>
    );
}
