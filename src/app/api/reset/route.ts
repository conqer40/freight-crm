import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const { password } = await req.json();
        const cookieStore = await cookies();
        const userId = cookieStore.get('session')?.value;

        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.role !== 'ADMIN') return NextResponse.json({ error: "Unauthorized Access" }, { status: 403 });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return NextResponse.json({ error: "كلمة المرور غير صحيحة" }, { status: 403 });

        await prisma.$transaction(async (tx: any) => {
            // Delete in order of dependency
            await tx.shipment.deleteMany();
            await tx.quote.deleteMany();
            await tx.quoteRequest.deleteMany();
            await tx.rFQ.deleteMany();
            // Clearing the join table for implicit RFQ<->Company relation happens automatically when RFQ/Company are deleted

            await tx.company.deleteMany();

            // Optional: Clear system logs and notifications to have a truly clean slate
            await tx.notification.deleteMany();
            await tx.log.deleteMany();
        });

        return NextResponse.json({ success: true, message: "System reset successfully" });
    } catch (e: any) {
        console.error("Reset error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
