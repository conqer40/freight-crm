import prisma from '@/lib/prisma';
import CompaniesView from '@/components/views/CompaniesView';

export default async function CompaniesPage() {
    const companies = await prisma.company.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return <CompaniesView companies={companies} />;
}
