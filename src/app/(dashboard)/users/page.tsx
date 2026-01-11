import prisma from '@/lib/prisma';
import UsersList from '@/components/users/UsersList';

export default async function UsersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="max-w-5xl mx-auto">
            <UsersList users={users} />
        </div>
    );
}
