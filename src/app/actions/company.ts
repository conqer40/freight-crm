'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createCompany(prevState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const email = formData.get('email') as string;
    const contact = formData.get('contact') as string;
    const services = formData.getAll('services');



    if (!name || !whatsapp) {
        return { message: 'الاسم ورقم الواتساب حقول إلزامية' };
    }

    try {
        await prisma.company.create({
            data: {
                name,
                type,
                whatsapp,
                email,
                contact,
                services: services.join(','),
            }
        });
    } catch (e) {
        return { message: 'حدث خطأ أثناء الحفظ' };
    }

    revalidatePath('/companies');
    redirect('/companies');
}

export async function deleteCompany(id: string) {
    await prisma.company.delete({ where: { id } });
    revalidatePath('/companies');
}
