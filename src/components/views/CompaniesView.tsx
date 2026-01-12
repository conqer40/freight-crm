'use client';

import Link from 'next/link';
import { Plus, Phone, Mail, User, Trash2, Sparkles } from 'lucide-react';
import { deleteCompany } from '@/app/actions/company';
import { useLanguage } from '@/lib/i18n';

export default function CompaniesView({ companies }: { companies: any[] }) {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-300 text-glow inline-block">{t.companies}</h2>
                    <p className="text-slate-400 mt-1">إدارة شبكة الشركاء والموردين</p>
                </div>
                <div className="flex gap-3">
                    {/* Magic Scanner Promotion */}
                    <Link
                        href="/rfqs/create"
                        className="hidden md:flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-xl hover:shadow-lg hover:shadow-fuchsia-500/20 transition-all border border-white/10 group"
                    >
                        <Sparkles size={18} className="group-hover:animate-spin" />
                        <span className="font-bold">جرب الماسح السحري ✨</span>
                    </Link>

                    <Link
                        href="/companies/create"
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span>{t.add_company}</span>
                    </Link>
                </div>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="premium-table">
                    <thead>
                        <tr>
                            <th>{t.company_name}</th>
                            <th>{t.type}</th>
                            <th>{t.services}</th>
                            <th>{t.contact}</th>
                            <th>{t.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-12 text-center text-slate-400">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                                            <User size={32} className="text-slate-600" />
                                        </div>
                                        <p>{t.no_data}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                        {companies.map((company) => (
                            <tr key={company.id} className="group">
                                <td>
                                    <div className="font-bold text-white text-lg">{company.name}</div>
                                    <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                                        {company.whatsapp && <span className="flex items-center gap-1"><Phone size={12} className="text-green-400" /> {company.whatsapp}</span>}
                                    </div>
                                </td>
                                <td>
                                    <span className="bg-slate-800/80 px-3 py-1 rounded-lg text-xs font-semibold border border-white/5 shadow-sm text-blue-300">
                                        {translateType(company.type)}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex flex-wrap gap-1">
                                        {company.services.split(',').map((s: string) => (
                                            <span key={s} className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded text-[10px] border border-blue-500/20">
                                                {translateService(s)}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td>
                                    {company.contact && (
                                        <div className="flex items-center gap-2 text-slate-300 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px]">
                                                {company.contact.charAt(0)}
                                            </div>
                                            {company.contact}
                                        </div>
                                    )}
                                    {company.email && (
                                        <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 pl-8">
                                            <Mail size={12} />
                                            {company.email}
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={async () => {
                                            if (confirm('Are you sure?')) await deleteCompany(company.id);
                                        }}
                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all border border-transparent hover:border-red-500/30"
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
        'shipping_line': 'خط ملاحي 🚢',
        'freight_forwarder': 'مرحل بضائع 📦',
        'trucking': 'نقل بري 🚛',
        'customs': 'تخليص جمركي 🛂'
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
