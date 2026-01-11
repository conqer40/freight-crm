'use server';

import { cookies } from 'next/headers';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username || !password) {
        return { message: 'يرجى إدخال اسم المستخدم وكلمة المرور' };
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    // For MVP/First run: Create admin if not exists
    if (!user && username === 'admin' && password === 'admin') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                role: 'ADMIN',
            }
        });

        // Set session
        const cookieStore = await cookies();
        cookieStore.set('session', newUser.id, { httpOnly: true });
        redirect('/');
    }

    if (!user) {
        return { message: 'اسم المستخدم غير صحيح' };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        return { message: 'كلمة المرور غير صحيحة' };
    }

    const cookieStore = await cookies();
    cookieStore.set('session', user.id, { httpOnly: true });

    redirect('/');
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
    redirect('/auth/login');
}
