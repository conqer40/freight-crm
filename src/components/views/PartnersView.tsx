'use client';

import { useState } from 'react';
import { Building2, Factory, Container, Search, Plus, Trash2, Phone, Mail, Globe } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

interface Company {
    id: string;
    name: string;
    type: string;
    services: string;
    whatsapp: string;
    email: string | null;
    rating: number;
}

export default function PartnersView({ initialCompanies }: { initialCompanies: Company[] }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'SUPPLIER' | 'IMPORTER' | 'FACTORY'>('SUPPLIER');
    const [search, setSearch] = useState('');

    // Filter companies based on active tab
    // We assume the 'type' field stores these values.
    // Search logic covers name.
    const filteredCompanies = initialCompanies.filter(c => {
        const matchesType = c.type?.toUpperCase() === activeTab;
        const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesSearch;
    });

    const getTabIcon = (tab: string) => {
        switch (tab) {
            case 'FACTORY': return <Factory size={18} />;
            case 'SUPPLIER': return <Building2 size={18} />;
            case 'IMPORTER': return <Container size={18} />;
            default: return <Building2 size={18} />;
        }
    };

    const getTabLabel = (tab: string) => {
        switch (tab) {
            case 'FACTORY': return 'المصانع (Factories)';
            case 'SUPPLIER': return 'الموردين (Suppliers)';
            case 'IMPORTER': return 'المستوردين (Importers)';
            default: return tab;
        }
    };

    return (
        <div className="space-y-6 p-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <UsersIcon />
                        Partners (شركاء النجاح)
                    </h1>
                    <p className="text-slate-400 mt-1">Manage your business network: Suppliers, Factories, and Importers.</p>
                </div>

                <Link
                    href={`/companies/create?type=${activeTab}`}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    <Plus size={20} />
                    <span>Add New {activeTab.charAt(0) + activeTab.slice(1).toLowerCase()}</span>
                </Link>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-slate-800/50 rounded-xl backdrop-blur-md border border-white/5 w-fit">
                {(['SUPPLIER', 'FACTORY', 'IMPORTER'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {getTabIcon(tab)}
                        {getTabLabel(tab)}
                    </button>
                ))}
            </div>

            {/* Search & Content */}
            <div className="glass-card min-h-[500px] flex flex-col">
                {/* Toolbar */}
                <div className="p-4 border-b border-white/5 flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder={`Search ${activeTab.toLowerCase()}s...`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all outline-none"
                        />
                    </div>
                    <div className="text-sm text-slate-400">
                        Showing <span className="text-white font-bold">{filteredCompanies.length}</span> partners
                    </div>
                </div>

                {/* Grid */}
                {filteredCompanies.length > 0 ? (
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredCompanies.map(company => (
                            <div key={company.id} className="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                                            {getTabIcon(activeTab)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white text-lg leading-tight">{company.name}</h3>
                                            <p className="text-xs text-blue-400 font-mono mt-0.5">{company.type}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {company.whatsapp && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300">
                                            <Phone size={14} className="text-emerald-500" />
                                            <span>{company.whatsapp}</span>
                                        </div>
                                    )}
                                    {company.email && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300">
                                            <Mail size={14} className="text-blue-500" />
                                            <span className="truncate">{company.email}</span>
                                        </div>
                                    )}
                                    {company.services && (
                                        <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-slate-300">
                                            <Globe size={14} className="text-indigo-500" />
                                            <span className="truncate">{company.services}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <Link
                                        href={`/companies/${company.id}`}
                                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <button className="p-2 rounded-lg hover:bg-red-500/20 text-slate-500 hover:text-red-400 transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 py-12">
                        <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mb-4">
                            {getTabIcon(activeTab)}
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No {activeTab.toLowerCase()}s found</h3>
                        <p className="text-sm max-w-xs text-center mb-6">Start building your network by adding your first {activeTab.toLowerCase()}.</p>
                        <Link
                            href={`/companies/create?type=${activeTab}`}
                            className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors"
                        >
                            Add {activeTab}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

function UsersIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
