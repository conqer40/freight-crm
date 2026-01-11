'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createRFQ(prevState: any, formData: FormData) {
    const title = formData.get('title') as string;
    const mode = formData.get('mode') as string; // ocean, air
    const pol = formData.get('pol') as string;
    const pod = formData.get('pod') as string;
    const commodity = formData.get('commodity') as string;
    const incoterm = formData.get('incoterm') as string;
    const freeDays = parseInt(formData.get('freeDays') as string) || 21;

    // Safely parse date
    const targetDateStr = formData.get('targetDate') as string;
    let targetDate = null;
    if (targetDateStr) {
        const parsed = new Date(targetDateStr);
        if (!isNaN(parsed.getTime())) {
            targetDate = parsed;
        }
    }

    // Optional based on mode
    const containerType = formData.get('containerType') as string;
    const containerCount = parseInt(formData.get('containerCount') as string) || 0;
    const weight = parseFloat(formData.get('weight') as string) || 0;

    if (!title || !pol || !pod) {
        return { message: 'يرجى ملء البيانات الأساسية (العنوان، ميناء القيام، ميناء الوصول)' };
    }

    try {
        const rfq = await prisma.rFQ.create({
            data: {
                title,
                mode,
                pol,
                pod,
                commodity: commodity || 'General Cargo',
                incoterm: incoterm || 'FOB',
                freeDays,
                targetDate,
                containerType: mode === 'ocean' ? containerType : null,
                containerCount: mode === 'ocean' ? containerCount : null,
                weight: weight, // Allow weight for all modes as per new UI
                status: 'DRAFT'
            }
        });

        return { message: null, redirectId: rfq.id };
    } catch (e: any) {
        console.error('Create RFQ Error:', e);
        return { message: `حدث خطأ: ${e.message}` };
    }
}

export async function addQuote(prevState: any, formData: FormData) {
    const rfqId = formData.get('rfqId') as string;
    const companyId = formData.get('companyId') as string;
    const price = parseFloat(formData.get('price') as string);
    const currency = formData.get('currency') as string;
    const freeDays = parseInt(formData.get('freeDays') as string);
    const notes = formData.get('notes') as string;

    if (!price) return { message: 'السعر مطلوب' };

    try {
        await prisma.quote.create({
            data: {
                rfqId,
                companyId,
                price,
                currency,
                freeDays,
                notes,
                status: 'RECEIVED'
            }
        });

        // Update RFQ status if it was sent
        await prisma.rFQ.update({
            where: { id: rfqId },
            data: { status: 'QUOTES_RECEIVED' }
        });

        revalidatePath(`/rfqs/${rfqId}`);
        return { message: null, success: true };
    } catch (e) {
        return { message: 'حدث خطأ أثناء إضافة العرض' };
    }
}

export async function awardQuote(quoteId: string, rfqId: string) {
    try {
        // 1. Get Quote details
        const quote = await prisma.quote.findUnique({
            where: { id: quoteId },
            include: { company: true }
        });

        if (!quote) throw new Error('Quote not found');

        // 2. Update Quote Status
        await prisma.quote.update({
            where: { id: quoteId },
            data: { status: 'WINNER' }
        });

        // 3. Update RFQ Status
        await prisma.rFQ.update({
            where: { id: rfqId },
            data: { status: 'AWARDED' }
        });

        // 4. Create Shipment
        await prisma.shipment.create({
            data: {
                rfqId: rfqId,
                companyId: quote.companyId,
                status: 'BOOKED',
                bookingNo: `BK-${Math.floor(Math.random() * 10000)}`, // Auto-gen placeholder
            }
        });

        revalidatePath(`/rfqs/${rfqId}`);
        redirect('/shipments'); // Redirect to shipments to see the result
    } catch (e) {
        console.error(e);
        return { message: 'Error' };
    }
}
