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
    return <DashboardView stats={stats} />;
}
