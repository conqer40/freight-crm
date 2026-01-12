'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateShipment(prevState: any, formData: FormData) {
    const id = formData.get('id') as string;
    const companyId = formData.get('companyId') as string;
    const status = formData.get('status') as string;
    const bookingNo = formData.get('bookingNo') as string;
    const blNo = formData.get('blNo') as string;
    const acidNumber = formData.get('acidNumber') as string;
    const shippingLine = formData.get('shippingLine') as string;
    const vessel = formData.get('vessel') as string;
    const notes = formData.get('notes') as string;
    const etdStr = formData.get('etd') as string;
    const etaStr = formData.get('eta') as string;

    try {
        await prisma.shipment.update({
            where: { id },
            data: {
                companyId: companyId || undefined,
                status,
                bookingNo,
                blNo,
                acidNumber,
                shippingLine,
                vessel,
                notes,
                etd: etdStr ? new Date(etdStr) : null,
                eta: etaStr ? new Date(etaStr) : null,
            }
        });

        revalidatePath(`/shipments/${id}`);
        revalidatePath('/shipments');
        return { message: 'تم تحديث الشحنة بنجاح', success: true };
    } catch (e: any) {
        console.error('Update Shipment Error:', e);
        return { message: `خطأ: ${e.message}`, success: false };
    }
}

export async function deleteShipment(id: string) {
    try {
        await prisma.shipment.delete({ where: { id } });
        revalidatePath('/shipments');
    } catch (e) {
        console.error('Delete Shipment Error:', e);
    }
}
