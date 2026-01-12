import prisma from '@/lib/prisma';
import DashboardView from '@/components/views/DashboardView';
import { Building2, FileText, Ship, BadgeDollarSign } from 'lucide-react';

export const dynamic = 'force-dynamic'; // Fix: Ensure data is always fresh

async function getStats() {
    const companiesCount = await prisma.company.count();
    const activeRfqs = await prisma.rFQ.count({ where: { status: { not: 'CLOSED' } } });
    const activeShipments = await prisma.shipment.count({ where: { status: { not: 'DELIVERED' } } });
    const pendingQuotes = await prisma.quote.count({ where: { status: 'RECEIVED' } });

    return { companiesCount, activeRfqs, activeShipments, pendingQuotes };
}

export default async function DashboardPage() {
    const stats = await getStats();

    // Fetch Historical Rates for AI Predictor
    const rawQuotes = await prisma.quote.findMany({
        where: { createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } }, // Last 90 days
        select: {
            price: true,
            createdAt: true,
            rfq: {
                select: {
                    pol: true,
                    pod: true,
                    mode: true
                }
            }
        },
        orderBy: { createdAt: 'asc' }
    });

    const historicalRates = rawQuotes.map(q => ({
        date: q.createdAt.toISOString().split('T')[0],
        rate: q.price,
        route: `${q.rfq.pol} -> ${q.rfq.pod}`,
        mode: q.rfq.mode
    }));

    return <DashboardView stats={stats} historicalRates={historicalRates} />;
}
