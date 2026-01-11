'use server';

import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function getOrCreateQuoteLink(rfqId: string, companyId: string) {
    try {
        let request = await prisma.quoteRequest.findUnique({
            where: {
                rfqId_companyId: { rfqId, companyId }
            }
        });

        if (!request) {
            request = await prisma.quoteRequest.create({
                data: {
                    rfqId,
                    companyId,
                    token: uuidv4(),
                    status: 'PENDING'
                }
            });
        }

        // Return the full URL (adjusted for dev/prod environment)
        // Ideally use process.env.NEXT_PUBLIC_APP_URL, defaulting to localhost for now
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        return { success: true, url: `${baseUrl}/p/${request.token}` };
    } catch (e: any) {
        console.error('Error generating link:', e);
        return { success: false, message: e.message };
    }
}

export async function submitPublicQuote(token: string, prevState: any, formData: FormData) {
    const price = parseFloat(formData.get('price') as string);
    const currency = formData.get('currency') as string;
    const freeDays = parseInt(formData.get('freeDays') as string);
    const notes = formData.get('notes') as string;
    const validityStr = formData.get('validity') as string;
    const validity = validityStr ? new Date(validityStr) : null;

    if (!price) return { message: 'Price is required' };

    try {
        const request = await prisma.quoteRequest.findUnique({
            where: { token },
            include: { rfq: true }
        });

        if (!request) return { message: 'Invalid or expired link' };

        // Create the quote
        await prisma.quote.create({
            data: {
                rfqId: request.rfqId,
                companyId: request.companyId,
                price,
                currency,
                freeDays,
                notes,
                validity,
                status: 'RECEIVED'
            }
        });

        // Update request status
        await prisma.quoteRequest.update({
            where: { id: request.id },
            data: { status: 'SUBMITTED' }
        });

        // Update RFQ status
        await prisma.rFQ.update({
            where: { id: request.rfqId },
            data: { status: 'QUOTES_RECEIVED' }
        });

        return { success: true, message: 'Quote submitted successfully!' };

    } catch (e: any) {
        console.error('Error submitting quote:', e);
        return { success: false, message: 'Failed to submit quote' };
    }
}
