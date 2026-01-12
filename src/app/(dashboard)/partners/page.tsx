import prisma from '@/lib/prisma';
import PartnersView from '@/components/views/PartnersView';

export const dynamic = 'force-dynamic';

export default async function PartnersPage() {
    // Fetch all companies that are likely partners
    const companies = await prisma.company.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return <PartnersView initialCompanies={companies} />;
}
