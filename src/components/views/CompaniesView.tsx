'use client';

import Link from 'next/link';
import { Plus, Phone, Mail, User, Trash2 } from 'lucide-react';
import { deleteCompany } from '@/app/actions/company';
import { useLanguage } from '@/lib/i18n';

export default function CompaniesView({ companies }: { companies: any[] }) {
    const { t } = useLanguage();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">{t.companies}</h2>
                <Link
                    href="/companies/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={20} />
                    <span>{t.add_company}</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 text-gray-500 text-sm">
                        <tr>
                            <th className="p-4 font-medium">{t.company_name}</th>
                            <th className="p-4 font-medium">{t.type}</th>
                            <th className="p-4 font-medium">{t.services}</th>
                            <th className="p-4 font-medium">{t.contact}</th>
                            <th className="p-4 font-medium">{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {companies.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-gray-400">
                                    {t.no_data}
                                </td>
                            </tr>
                        )}
                        {companies.map((company) => (
                            <tr key={company.id} className="hover:bg-gray-50">
                                <td className="p-4">
                                    <div className="font-semibold text-gray-900">{company.name}</div>
                                    <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                                        {company.whatsapp && <span className="flex items-center gap-1"><Phone size={10} /> {company.whatsapp}</span>}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">
                                        {translateType(company.type)}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    <div className="flex flex-wrap gap-1">
                                        {company.services.split(',').map((s: string) => (
                                            <span key={s} className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px]">
                                                {translateService(s)}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-600">
                                    {company.contact && (
                                        <div className="flex items-center gap-1">
                                            <User size={14} className="text-gray-400" />
                                            {company.contact}
                                        </div>
                                    )}
                                    {company.email && (
                                        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                            <Mail size={12} />
                                            {company.email}
                                        </div>
                                    )}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={async () => await deleteCompany(company.id)}
                                        className="text-red-400 hover:text-red-600 p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function translateType(type: string) {
    const map: any = {
        'shipping_line': 'خط ملاحي',
        'freight_forwarder': 'مرحل بضائع',
        'trucking': 'نقل بري',
        'customs': 'تخليص جمركي'
    };
    return map[type] || type;
}

function translateService(service: string) {
    const map: any = {
        'ocean': 'بحري',
        'air': 'جوي',
        'inland': 'داخلي',
        'customs': 'جمركي'
    };
    return map[service] || service;
}
