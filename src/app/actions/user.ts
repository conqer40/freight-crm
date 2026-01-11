'use server';

import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function createUser(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!username || !password) return { message: 'Username and password are required' };

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role
            }
        });

        revalidatePath('/users');
        return { success: true, message: 'User created successfully' };
    } catch (e: any) {
        if (e.code === 'P2002') return { message: 'Username already exists' };
        return { message: 'Failed to create user' };
    }
}

export async function deleteUser(userId: string) {
    try {
        await prisma.user.delete({ where: { id: userId } });
        revalidatePath('/users');
        return { success: true, message: 'User deleted' };
    } catch (e) {
        return { success: false, message: 'Failed to delete' };
    }
}

export async function updateUser(prevState: any, formData: FormData) {
    const id = formData.get('id') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    const data: any = { role };
    if (password) {
        data.password = await bcrypt.hash(password, 10);
    }

    try {
        await prisma.user.update({
            where: { id },
            data
        });
        revalidatePath('/users');
        return { success: true, message: 'User updated' };
    } catch (e) {
        return { success: false, message: 'Failed to update' };
    }
}
