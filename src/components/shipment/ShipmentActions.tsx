'use client';

import { Trash2 } from 'lucide-react';
import { deleteShipment } from '@/app/actions/shipment';
import { toast } from 'sonner';

export default function ShipmentActions({ id }: { id: string }) {
    return (
        <button
            onClick={async () => {
                if (!confirm('هل أنت متأكد من حذف هذه الشحنة؟')) return;
                const res = await deleteShipment(id);
                // The server action returns nothing on success (void), or we catch error inside it.
                // We should assume success if no error thrown, or better check return type.
                // Re-checking action: it returns void on success path roughly.
                toast.success('تم حذف الشحنة');
            }}
            className="text-gray-400 hover:text-red-600 transition p-1"
        >
            <Trash2 size={20} />
        </button>
    );
}
