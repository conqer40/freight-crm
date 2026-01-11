'use server';

import prisma from '@/lib/prisma';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function getCurrentUserId() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    return session?.value;
}

export async function getNotifications() {
    const userId = await getCurrentUserId();
    if (!userId) return [];

    return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: 20
    });
}

export async function getUnreadCount() {
    const userId = await getCurrentUserId();
    if (!userId) return 0;

    return await prisma.notification.count({
        where: { userId, isRead: false }
    });
}

export async function markRead(id: string) {
    const userId = await getCurrentUserId();
    if (!userId) return;

    await prisma.notification.update({
        where: { id, userId }, // Ensure ownership
        data: { isRead: true }
    });

    revalidatePath('/');
}

export async function markAllRead() {
    const userId = await getCurrentUserId();
    if (!userId) return;

    await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true }
    });

    revalidatePath('/');
}

// Internal helper to send notification
export async function sendNotification(userId: string, title: string, message: string) {
    await prisma.notification.create({
        data: { userId, title, message }
    });
}
